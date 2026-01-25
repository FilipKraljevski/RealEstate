import { Container, Typography, Box, Divider, Grid, Button } from '@mui/material'
import { createLazyRoute, useMatchRoute, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import z from 'zod'
import { Country } from '../../common/Domain/Country'
import { EstateType, showRoomField } from '../../common/Domain/EstateType'
import { PurchaseType } from '../../common/Domain/PurchaseType'
import { useAppForm } from '../../common/form'
import AlertError from '../../common/form/components/AlertError'
import { enumToOptions } from '../../common/Logic/EnumHelper'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCities } from '../../common/Service/CityService'
import { getEstateDetails, saveEstate } from '../../common/Service/EstateService'
import { convertToObjectUrl, fileToImage } from '../../common/Logic/ImageHelper'
import { Protected } from '../../common/Routing/Routes'
import { RoleType } from '../../common/Domain/RoleType'
import { useAuth } from '../../common/Context/AuthProvider'
import type { ImageResponse } from '../../common/Service/DTO/ResponseBody'
import type { Response } from '../../common/Service/ServiceConfig'
import { useNotification } from '../../common/Context/NotificationProvider'

export const Route1 = createLazyRoute('/EstateForm')({
    component: () => (
        <Protected authorizedRoles={RoleType.Agency}>
          <EstateForm />
        </Protected>
      )
})

export const Route = createLazyRoute('/EstateForm/$id')({
    component: () => (
        <Protected authorizedRoles={RoleType.Agency}>
          <EstateForm />
        </Protected>
      )
})

export default function EstateForm() {
    const [addCityOpen, setAddCityOpen] = useState(true)
    const { t } = useTranslation()
    const { token } = useAuth();
    const { notify } = useNotification()

    const purchaseOptions = enumToOptions(PurchaseType)
    const estateOptions = enumToOptions(EstateType)
    const countryOptions = enumToOptions(Country)

    const matchRoute = useMatchRoute();
    const id  = !!matchRoute({ to: '/EstateForm/$id' }) ? useParams({ from: '/EstateForm/$id' }).id : ""
    const { data: estate } = useQuery({
        queryKey: ['estateDetails', id],
        enabled: id != "",
        queryFn:() => getEstateDetails(id)
    })
    const { mutate } = useMutation({
        mutationFn: saveEstate,
        onSuccess: () => notify("success"),
        onError: (err: Response) => notify("error", err.message)
    })

    const City = z.object({
        id: z.string().optional(),
        name: z.string()
    })

    type City = z.infer<typeof City>;

    const ImageShow = z.object({
        id: z.string().optional(),
        content: z.string(),
        name: z.string()
    });

    type ImageShow = z.infer<typeof ImageShow>;

    const AdditionalEstateInfo = z.object({
        id: z.string().optional(),
        name: z.string().nonempty(t('error.Required'))
    })

    type AdditionalEstateInfo = z.infer<typeof AdditionalEstateInfo>;

    const validationSchema = z.object({
        id: z.string(),
        title:  z.string().nonempty(t('error.Required')),
        price: z.coerce.number().gt(0, t('error.GT0')),
        purchaseType: z.nativeEnum(PurchaseType, { message: t('error.Select')}),
        estateType: z.nativeEnum(EstateType, { message: t('error.Select')}),
        area: z.coerce.number().gt(0, t('error.GT0')),
        country: z.nativeEnum(Country, { message: t('error.Select')}),
        city: City,
        municipality: z.string().nonempty(t('error.Required')),
        yearOfConstruction: z.coerce.number().gt(0, t('error.GT0')),
        floor: z.string().nonempty(t('error.Required')),
        rooms: z.coerce.number().nonnegative(t('error.NonNegative')),
        description: z.string(),
        additionalEstateInfo: z.array(AdditionalEstateInfo),
        images: z.array(ImageShow).min(1, t('error.Required'))
    }).superRefine((vals, ctx) => {
        if(vals.country == Country.None){
            ctx.addIssue({
                code:     z.ZodIssueCode.custom,
                message:  t('error.Required'),
                path:     ['country'],
            })
        }
    })

    const mapResponseImages = (images: ImageResponse[] | undefined) => {
        return images?.map(x => { return { id: x.id, content: x.content, name: ""} })
    }

    const form = useAppForm({
        defaultValues: {
            id: estate?.id ?? "",
            title: estate?.title ?? "",
            price: estate?.price ?? 0,
            purchaseType: estate?.purchaseType ?? 0,
            estateType: estate?.estateType ?? 0,
            area: estate?.area ?? 0,
            country: estate?.country ?? 0,
            city: estate?.city ?? { id: undefined, name: "" } as City,
            municipality: estate?.municipality ?? "",
            yearOfConstruction: estate?.yearOfConstruction ?? 0,
            floor: estate?.floor ?? "0",
            rooms: estate?.rooms ?? 0,
            description: estate?.description ?? "",
            additionalEstateInfo: estate?.additionalEstateInfo ?? [] as AdditionalEstateInfo[],
            images:  mapResponseImages(estate?.images) ?? [] as ImageShow[]
        },
        validators: {
            onSubmit: validationSchema
        },
        onSubmit: async ({value}) => {
            const city = {
                id: value.city.id,
                name:  value.city.name,
                country: value.country
            }
            const payload = {
                ...value,
                city,
                id: value.id === "" ? undefined : value.id
            };
            mutate({ body: payload, code: token })
        }
    })

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    const { data: cities, refetch } = useQuery({
        queryKey: ["cities", form.state.values.country],
        enabled: form.state.values.country != Country.None,
        queryFn:() =>  getCities(form.state.values.country) 
    })

    const onCityClick = (value: boolean) => {
        setAddCityOpen(value)
        form.setFieldValue("city", { id: undefined, name: "" })
    }

    const onCitySelectChange = (e: any) => {
        const city = cities?.find(x => x.id === e.target.value) ?? { id: e.target.value, name: ""}
        form.setFieldValue("city", city )
    }

    const onCityAddChange = (e: any) => {
        form.setFieldValue("city", { id: undefined, name: e.target.value } )
    }

    const onImageRemove = (index: number) => {
        const images = form.state.values.images.filter((_, i) => i != index)
        form.setFieldValue("images", images)
    }

    const onImageChange = async (e: any) => {
        const files = [...(e.target.files ?? [])];
        const images = [...form.state.values.images];
        const newImages = await Promise.all(files.map(async (file) => {
            const image = await fileToImage(file);
            return { id: undefined, content: image.content, name: image.name };
            })
        );
        const updated = [...images, ...newImages];
        form.setFieldValue("images", updated);
    }
    
    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%',}}>{t('RealEstate.YourEstatesForm')}</Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleOnSubmit} width='100%' 
                sx={{flexGrow: 1}}>
                <Divider />
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('RealEstate.GeneralInfo')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={4}>
                        <form.AppField name="title" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="purchaseType" children={(field) => <field.SelectField data={purchaseOptions}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="estateType" children={(field) => <field.SelectField data={estateOptions}/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="price" children={(field) => <field.Text required={true} type='number' fullWidth={true} adornment='€'/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="area" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="yearOfConstruction" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="floor" children={(field) => <field.Text fullWidth={true} placeholder='eg., 0, 2-3'/>} />
                    </Grid>
                    <form.Subscribe selector={(state) => state.values.estateType} children=
                        {(estateType) => {
                            if (!showRoomField(estateType)) return null
                            
                            return (
                                <Grid size={2}>
                                    <form.AppField name="rooms" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                                </Grid>
                            )
                        }}/>
                </Grid>
                <Divider sx={{mt: '1%'}}/>
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('RealEstate.DescriptionInfo')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={12}>
                        <form.AppField name="description" children={(field) => <field.TextArea required={false}/>} />
                    </Grid>
                </Grid>
                <Divider sx={{mt: '1%'}}/>
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('RealEstate.LocationInfo')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={3}>
                        <form.AppField name="country" children={(field) => <field.SelectField data={countryOptions} defaultValue={true}/>} />
                    </Grid>
                    <form.Subscribe selector={(state) => state.values.country} children=
                        {(country) => {
                            if(country != Country.None && addCityOpen){
                                refetch()
                            }
                            const isDisabled = country === Country.None
                            const cityOptions = isDisabled || cities == undefined ? [] : 
                                cities.map(item =>{ return ( { label: item.name, value: item.id } ) })
                            
                            return (
                                <Grid size={3}>
                                    {addCityOpen ? 
                                    <>
                                        <form.AppField name="city.id" children={(field) => <field.SelectField data={cityOptions}
                                            disabled={isDisabled} translate={false} onChange={onCitySelectChange} defaultValue={true} label={t('form.city')}/>}/>
                                        <Button onClick={() => onCityClick(false)}>
                                            {t('RealEstate.AddCity')}
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <form.AppField name="city.name" children={(field) => <field.Text fullWidth={true} onChange={onCityAddChange} label={t('form.city')}/>} />
                                        <Button onClick={() => onCityClick(true)}>
                                            {t('RealEstate.SelectCity')}
                                        </Button>
                                    </>
                                    }
                                </Grid>
                            )
                        }}/>
                    <Grid size={4}>
                        <form.AppField name="municipality" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                </Grid>
                <Divider sx={{mt: '1%'}}/>
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('RealEstate.AdditionalInfo')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <form.Field name="additionalEstateInfo" mode="array">
                    {(field) => {
                        return (
                            <>
                                {field.state.value.map((_, i) => {
                                return (
                                    <form.AppField key={i} name={`additionalEstateInfo[${i}].name`} children={(field) => {
                                            return (
                                                <Grid size={3}>
                                                    <field.Text fullWidth={true} label={t('form.additionalInfo')}/>
                                                </Grid>
                                            )
                                        }
                                    }>
                                    </form.AppField>
                                )
                                })}
                                <Grid size={3}>
                                    <Button onClick={() => field.pushValue({id: undefined, name: ""})}>
                                        {t('RealEstate.Add')}
                                    </Button>
                                    <Button color="error" onClick={() => field.removeValue(field.getMeta.length-1)}>
                                        {t('RealEstate.Remove')}
                                    </Button>
                                </Grid>
                            </>
                        )
                    }}
                    </form.Field>
                </Grid>
                <Divider sx={{mt: '1%'}}/>
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('RealEstate.ImagesInfo')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={12}>
                        <form.AppField name="images" children={(field) => <field.ImageField onChange={onImageChange} />} />
                        <form.Subscribe selector={(state) => state.values.images} children=
                            {(images) => {
                                return (
                                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                        {images.map((image: ImageShow, i: any) => (
                                            <Box
                                                key={image.name}
                                                component="img"
                                                src={convertToObjectUrl(image.content)}
                                                alt={image.name}
                                                sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                                onClick={() => onImageRemove(i)}
                                            />
                                        ))}
                                    </Box>
                                )
                            }}/>
                    </Grid>
                </Grid>
                <form.Subscribe selector={(state) => state.isValid} children=
                {(isValid) => {
                    if (isValid) return null
                    
                    return (
                        <AlertError />
                    )
                }}/>
                <Button type='submit' variant='contained' sx={{mt: '1%'}}>{t('RealEstate.Save')}</Button>
            </Box>
        </Container>
    )
}
