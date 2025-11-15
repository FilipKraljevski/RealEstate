import { Container, Typography, Box, Divider, Grid, Button } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import z from 'zod'
import { Country } from '../../common/Domain/Country'
import { EstateType, showRoomField } from '../../common/Domain/EstateType'
import { PurchaseType } from '../../common/Domain/PurchaseType'
import { useAppForm } from '../../common/form'
import AlertError from '../../common/form/components/AlertError'
import { enumToOptions } from '../../common/Logic/EnumHelper'
import { useState } from 'react'

export const Route1 = createLazyRoute('/EstateForm')({
    component: EstateForm
})

export const Route = createLazyRoute('/EstateForm/$id?')({
    component: EstateForm
})

export default function EstateForm() {
    const [addCityOpen, setAddCityOpen] = useState(true)
    const { t } = useTranslation()

    const purchaseOptions = enumToOptions(PurchaseType)
    const estateOptions = enumToOptions(EstateType)
    const countryOptions = enumToOptions(Country)

    const City = z.object({
        id: z.string().optional(),
        name: z.string(),
        country: z.nativeEnum(EstateType),
    });

    type City = z.infer<typeof City>;

    const validationSchema = z.object({
        title:  z.string().nonempty(t('error.Required')),
        price: z.coerce.number().gt(0, t('error.GT0')),
        purchaseType: z.nativeEnum(PurchaseType, { message: t('error.Select')}),
        estateType: z.nativeEnum(EstateType, { message: t('error.Select')}),
        area: z.coerce.number().nonnegative(t('error.NonNegative')),
        country: z.nativeEnum(Country, { message: t('error.Select')}),
        city: City,
        municipality: z.string().nonempty(t('error.Required')),
        yearConstruction: z.coerce.number().nonnegative(t('error.NonNegative')),
        floor: z.string().nonempty(t('error.Required')),
        rooms: z.coerce.number().nonnegative(t('error.NonNegative')),
        description: z.string(),
        additionalInfo: z.array(z.string()),
        images: z.array(z.instanceof(File))
    }).superRefine((vals, ctx) => {
        if(vals.images.find(x => !x.type.startsWith("image/"))){
            ctx.addIssue({
                code:     z.ZodIssueCode.custom,
                message:  t('error.Images'),
                path:     ['images'],
            })
        }
    })

    const form = useAppForm({
        defaultValues: {
            title: "",
            price: 0,
            purchaseType: 0,
            estateType: 0,
            area: 0,
            country: 0,
            city: {} as City,
            municipality: "",
            yearConstruction: 0,
            floor: "0",
            rooms: 0,
            description: "",
            additionalInfo: [] as string[],
            images: [] as File[]
        },
        validators: {
            onSubmit: validationSchema
        },
        onSubmit: ({value}) => {
            console.log(value)
        }
    })

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    const getCities = (countyId: any) => {
        return itemDataCities
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
                        <form.AppField name="yearConstruction" children={(field) => <field.Text fullWidth={true} type='number'/>} />
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
                            const cityOptions = isDisabled ? [] : getCities(country)
                            
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
                    <form.Field name="additionalInfo" mode="array">
                    {(field) => {
                        return (
                            <>
                                {field.state.value.map((_, i) => {
                                return (
                                    <form.AppField key={i} name={`additionalInfo[${i}]`} children={(field) => {
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
                                    <Button onClick={() => field.pushValue("")}>
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
                        <form.AppField name="images" children={(field) => <field.ImageField />} />
                        <form.Subscribe selector={(state) => state.values.images} children=
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

const itemDataCities/*: Item[]*/ = [
    {
        value: "id",
        label: "Skopje"
    },
]