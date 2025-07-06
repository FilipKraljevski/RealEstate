import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'
import { useAppForm } from '../../common/form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { PurchaseType } from '../../common/Domain/purchaseType'
import { EstateType, showRoomField } from '../../common/Domain/EstateType'
import { Country } from '../../common/Domain/Country'
import AlertError from '../../common/form/components/AlertError'
import { enumToOptions } from '../../common/Logic/EnumHelper'

export const Route = createLazyRoute('/LookingProperty')({
    component: LookingProperty,
})

export default function LookingProperty() {

    const { t } = useTranslation()

    const purchaseOptions = enumToOptions(PurchaseType)
    const estateOptions = enumToOptions(EstateType)
    const countryOptions = enumToOptions(Country)
    const YesNoOptions = [{value: true, label: 'Yes'}, {value: false, label: 'No'}]

    const validationSchema = z.object({
        name: z.string().nonempty(t('error.Required')),
        email: z.string().email(t('error.Email')),
        telephone: z.string(),
        maxPrice: z.coerce.number().gt(0, t('error.GT0')),
        purchaseType: z.nativeEnum(PurchaseType, { message: t('error.Select')}),
        estateType: z.nativeEnum(EstateType, { message: t('error.Select')}),
        areaFrom: z.coerce.number().nonnegative(t('error.NonNegative')),
        areaTo: z.coerce.number(),
        country: z.nativeEnum(Country, { message: t('error.Select')}),
        location: z.string().nonempty(t('error.Required')),
        terrace: z.boolean(),
        heating: z.boolean(),
        parking: z.boolean(),
        elevator: z.boolean(),
        yearConstruction: z.coerce.number().nonnegative(t('error.NonNegative')),
        floorFrom: z.coerce.number().nonnegative(t('error.NonNegative')),
        floorTo: z.coerce.number(),
        rooms: z.coerce.number().nonnegative(t('error.NonNegative')),
        message: z.string()
    }).superRefine((vals, ctx) => {
        if (vals.areaFrom > vals.areaTo) {
            ctx.addIssue({
                code:     z.ZodIssueCode.custom,
                message:  t('error.AreaFrom'),
                path:     ['areaFrom'],
            })
        }
        if (vals.floorFrom > vals.floorTo) {
            ctx.addIssue({
                code:     z.ZodIssueCode.custom,
                message:  t('error.FloorFrom'),
                path:     ['floorFrom'],
            })
        }
    })

    const form = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            telephone: "",
            maxPrice: 0,
            purchaseType: 0,
            estateType: 0,
            areaFrom: 0,
            areaTo: 0,
            country: 0,
            location: "",
            terrace: false,
            heating: false,
            parking: false,
            elevator: false,
            yearConstruction: 0,
            floorFrom: 0,
            floorTo: 0,
            rooms: 0,
            message: ""
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
            <Typography variant='h4' sx={{mb: '1%',}}>{t('LookingProperty.LookingProperty')}</Typography>
            <Typography sx={{mb: '1%', fontWeight: "bold"}}>{t('LookingProperty.Intro')}</Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleOnSubmit} width='100%' 
                sx={{flexGrow: 1}}>
                <Divider />
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('LookingProperty.PersonData')}</Typography>
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
                        <form.AppField name="maxPrice" children={(field) => <field.Text required={true} type='number' fullWidth={true}/>} />
                    </Grid>
                </Grid>
                <Divider />
                <Typography sx={{mt: '1%', fontWeight: "bold"}}>{t('LookingProperty.EstateData')}</Typography>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={3}>
                        <form.AppField name="purchaseType" children={(field) => <field.SelectField data={purchaseOptions}/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="estateType" children={(field) => <field.SelectField data={estateOptions}/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="areaFrom" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="areaTo" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={3}>
                        <form.AppField name="country" children={(field) => <field.SelectField data={countryOptions}/>} />
                    </Grid>
                    <Grid size={4}>
                        <form.AppField name="location" children={(field) => <field.Text fullWidth={true}/>} />
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
                        <form.AppField name="floorFrom" children={(field) => <field.Text fullWidth={true} type='number'/>} />
                    </Grid>
                    <Grid size={2}>
                        <form.AppField name="floorTo" children={(field) => <field.Text fullWidth={true} type='number'/>} />
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
                </Grid>
                <form.Subscribe selector={(state) => state.isValid} children=
                {(isValid) => {
                    if (isValid) return null
                    
                    return (
                        <AlertError />
                    )
                }}/>
                <Button type='submit' variant='contained' sx={{mt: '1%'}}>{t('LookingProperty.Submit')}</Button>
            </Box>
        </Container>
    )
}