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

export const Route = createLazyRoute('/YourOffer')({
    component: YourOffer,
})

export default function YourOffer() {
    
    const { t } = useTranslation()

    const purchaseOptions = enumToOptions(PurchaseType)
    const estateOptions = enumToOptions(EstateType)
    const countryOptions = enumToOptions(Country)
    const YesNoOptions = [{value: true, label: 'Yes'}, {value: false, label: 'No'}]

    const validationSchema = z.object({
        name: z.string().nonempty(t('error.Required')),
        email: z.string().email(t('error.Email')),
        telephone: z.string(),
        address: z.string().nonempty(t('error.Required')),
        price: z.coerce.number().gt(0, t('error.GT0')),
        purchaseType: z.nativeEnum(PurchaseType, { message: t('error.Select')}),
        estateType: z.nativeEnum(EstateType, { message: t('error.Select')}),
        area: z.coerce.number().nonnegative(t('error.NonNegative')),
        country: z.nativeEnum(Country, { message: t('error.Select')}),
        city: z.string().nonempty(t('error.Required')),
        municipality: z.string().nonempty(t('error.Required')),
        terrace: z.boolean(),
        heating: z.boolean(),
        parking: z.boolean(),
        elevator: z.boolean(),
        yearConstruction: z.coerce.number().nonnegative(t('error.NonNegative')),
        floor: z.coerce.number().nonnegative(t('error.NonNegative')),
        basement: z.boolean(),
        rooms: z.coerce.number().nonnegative(t('error.NonNegative')),
        message: z.string(),
        images: z.array(z.instanceof(File))
    })

    const form = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            telephone: "",
            address: "",
            price: 0,
            purchaseType: 0,
            estateType: 0,
            area: 0,
            country: 0,
            city: "",
            municipality: "",
            terrace: false,
            heating: false,
            parking: false,
            elevator: false,
            yearConstruction: 0,
            floor: 0,
            basement: false,
            rooms: 0,
            message: "",
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

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%',}}>{t('YourOffer.YourOffer')}</Typography>
            <Typography sx={{mb: '1%', fontWeight: "bold"}}>{t('YourOffer.Intro')}</Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleOnSubmit} width='100%' 
                sx={{flexGrow: 1}}>
                <Divider />
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('YourOffer.PersonData')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={4}>
                        <form.AppField name="name" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="email" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="telephone" children={(field) => <field.Text required={false} type='tel' fullWidth={true}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="address" children={(field) => <field.Text required={true} fullWidth={true} placeholder='Ul. Bul. V.S.B'/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="price" children={(field) => <field.Text required={true} type='number' fullWidth={true} adornment='€'/>} />
                    </Grid>
                </Grid>
                <Divider />
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('YourOffer.EstateData')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={3}>
                        <form.AppField name="purchaseType" children={(field) => <field.SelectField data={purchaseOptions}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="estateType" children={(field) => <field.SelectField data={estateOptions}/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="area" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="country" children={(field) => <field.SelectField data={countryOptions}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="city" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="municipality" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="terrace" children={(field) => <field.SelectField data={YesNoOptions} defaultValue={true}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="heating" children={(field) => <field.SelectField data={YesNoOptions} defaultValue={true}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="parking" children={(field) => <field.SelectField data={YesNoOptions} defaultValue={true}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="elevator" children={(field) => <field.SelectField data={YesNoOptions} defaultValue={true}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="yearConstruction" children={(field) => <field.Text fullWidth={true}/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="floor" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="basement" children={(field) => <field.SelectField data={YesNoOptions} defaultValue={true}/>} />
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
                    <Grid size={10}>
                        <form.AppField name="message" children={(field) => <field.TextArea required={false}/>} />
                    </Grid>
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
                <Button type='submit' variant='contained' sx={{mt: '1%'}}>{t('YourOffer.Submit')}</Button>
            </Box>
        </Container>
    )
}