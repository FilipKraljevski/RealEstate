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
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCities } from '../../common/Service/CityService'
import { getEstateDetails, saveEstate } from '../../common/Service/EstateService'
import type { Image } from '../../common/Service/DTO/RequestBody'
import { fileToImage } from '../../common/Logic/ImageHelper'
import { Protected } from '../../common/Routing/Routes'
import { RoleType } from '../../common/Domain/RoleType'
import { useAuth } from '../../common/Context/AuthProvider'

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
        mutationFn: saveEstate
    })

    const ImageShow = z.object({
        id: z.string(),
        content: z.string(),
    });

    type ImageShow = z.infer<typeof ImageShow>;

    const AdditionalEstateInfo = z.object({
        id: z.string().optional(),
        name: z.string()
    })

    type AdditionalEstateInfo = z.infer<typeof AdditionalEstateInfo>;

    const validationSchema = z.object({
        id: z.string(),
        title:  z.string().nonempty(t('error.Required')),
        price: z.coerce.number().gt(0, t('error.GT0')),
        purchaseType: z.nativeEnum(PurchaseType, { message: t('error.Select')}),
        estateType: z.nativeEnum(EstateType, { message: t('error.Select')}),
        area: z.coerce.number().nonnegative(t('error.NonNegative')),
        country: z.nativeEnum(Country, { message: t('error.Select')}),
        city: z.string().nonempty(t('error.Required')),
        cityId: z.string(),
        municipality: z.string().nonempty(t('error.Required')),
        yearOfConstruction: z.coerce.number().nonnegative(t('error.NonNegative')),
        floor: z.string().nonempty(t('error.Required')),
        rooms: z.coerce.number().nonnegative(t('error.NonNegative')),
        description: z.string(),
        additionalEstateInfo: z.array(AdditionalEstateInfo),
        images: z.array(ImageShow),
        addedImages: z.array(z.instanceof(File))
    }).superRefine((vals, ctx) => {
        if(vals.addedImages.find(x => !x.type.startsWith("image/"))){
            ctx.addIssue({
                code:     z.ZodIssueCode.custom,
                message:  t('error.Images'),
                path:     ['addedImages'],
            })
        }
    })

    const form = useAppForm({
        defaultValues: {
            id: estate?.id ?? "",
            title: estate?.title ?? "",
            price: estate?.price ?? 0,
            purchaseType: estate?.purchaseType ?? 0,
            estateType: estate?.estateType ?? 0,
            area: estate?.area ?? 0,
            country: estate?.country ?? 0,
            city: estate?.city ?? "",
            cityId: estate?.cityId ?? "",
            municipality: estate?.municipality ?? "",
            yearOfConstruction: estate?.yearOfConstruction ?? 0,
            floor: estate?.floor ?? "0",
            rooms: estate?.rooms ?? 0,
            description: estate?.description ?? "",
            additionalEstateInfo: estate?.additionalEstateInfo ?? [] as AdditionalEstateInfo[],
            images:  estate?.images ?? [] as ImageShow[],
            addedImages: [] as File[]
        },
        validators: {
            onSubmit: validationSchema
        },
        onSubmit: async ({value}) => {
            console.log(value)
            const images: Image[] = await Promise.all(
                value.addedImages.map((file) => fileToImage(file))
            );
            const c = addCityOpen ? { id: undefined, name: value.city }: cities?.find(x => x.id == value.city)
            const city = {
                id: c?.id,
                name: c?.name ?? "",
                country: value.country
            }
            const payload = {
                ...form.state.values,
                images,
                city
            };
            mutate({ body: payload, code: token })
        }
    })

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    const { data: cities } = useQuery({
        queryKey: ["cities", form.state.values.country],
        enabled: form.state.values.country != Country.None,
        queryFn:() =>  getCities(form.state.values.country) 
    })

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
                        <form.AppField name="country" children={(field) => <field.SelectField data={countryOptions}/>} />
                    </Grid>
                    <form.Subscribe selector={(state) => state.values.country} children=
                        {(country) => {
                            const isDisabled = country === 0
                            const cityOptions = isDisabled || cities == undefined ? [] : 
                            cities.map(item =>{ return ( { label: item.name, value: item.id } ) })
                            
                            return (
                                <Grid size={3}>
                                    {addCityOpen ? 
                                    <>
                                        <form.AppField name="city" children={(field) => <field.SelectField data={cityOptions}  
                                            disabled={isDisabled} translate={false}/>} />
                                        <Button onClick={() => setAddCityOpen(false)}>
                                            {t('RealEstate.AddCity')}
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <form.AppField name="city" children={(field) => <field.Text fullWidth={true}/>} />
                                        <Button onClick={() => setAddCityOpen(true)}>
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
                                    <form.AppField key={i} name={`additionalEstateInfo[${i}]`} children={(field) => {
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
                        <form.AppField name="addedImages" children={(field) => <field.ImageField />} />
                        <form.Subscribe selector={(state) => state.values.addedImages} children=
                            {(images) => {
                                return (
                                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                        {images.map((file: any) => (
                                            <Box
                                                key={file.name}
                                                component="img"
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                sx={{ width: 100, height: 100, objectFit: 'cover' }}
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