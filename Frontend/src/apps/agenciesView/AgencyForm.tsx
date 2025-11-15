import { createLazyRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import z from "zod";
import { useAppForm } from "../../common/form";
import { Container, Typography, Divider, Box, Button, Avatar, IconButton, Grid, Stack } from "@mui/material";
import AlertError from "../../common/form/components/AlertError";
import { Country } from "../../common/Domain/Country";
import { enumToOptions } from "../../common/Logic/EnumHelper";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";

export const Route1 = createLazyRoute('/AgencyForm')({
    component: AgencyForm,
})

export const Route = createLazyRoute('/AgencyForm/$id?')({
    component: AgencyForm,
})

export default function AgencyForm() {
    
    const { t } = useTranslation()
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)
    
    const countryOptions = enumToOptions(Country)

    const validationSchema = z.object({
        name: z.string().nonempty(t('error.Required')),
        description: z.string().nonempty(t('error.Required')),
        country: z.nativeEnum(Country, { message: t('error.Select')}),
        email: z.string().email(t('error.Email')),
        telephones: z.array(z.string()).min(1, t('error.Required')),
        picture: z.array(z.instanceof(File)).max(1)
    })

    const form = useAppForm({
        defaultValues: {
            name: "",
            description: "",
            country: 0,
            email: "",
            telephones: [] as string[],
            picture: [] as File[]
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

    const passwordValidationSchema = z.object({
        oldPassword: z.string().nonempty(t('error.Required')),
        newPassword: z.string().nonempty(t('error.Required')),
        confirmPassword: z.string().nonempty(t('error.Required')),
    }).superRefine((vals, ctx) => {
        if(vals.newPassword === vals.confirmPassword){
            ctx.addIssue({
                code:     z.ZodIssueCode.custom,
                message:  t('error.ConfirmPassword'),
                path:     ['confirmPassword'],
            })
        }
    })

    const passwordForm = useAppForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validators: {
            onSubmit: passwordValidationSchema
        },
        onSubmit: ({value}) => {
            console.log(value)
        }
    })

    const handlePasswordSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        passwordForm.handleSubmit()
    }

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>{t("Agencies.Profile")}</Typography>
            <Divider />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box flex={1}>
                    <Box component="form" noValidate autoComplete="off" onSubmit={handleOnSubmit} width="100%">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', mt: 2 }}>
                            <form.Subscribe selector={(state) => state.values.picture} children=
                                    {(picture) => {
                                        return (
                                            <Avatar
                                                src={picture[0] ? URL.createObjectURL(picture[0]) : undefined}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        )
                                    }
                                }/>
                            <form.AppField name="picture" children={(field) => {
                                return (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <IconButton component="label" sx={{ ml: 2 }}>
                                            <PhotoCamera />
                                            <field.ImageField multiple={false} hidden={true} hideName={true}/>
                                        </IconButton>
                                    </Box>
                                )
                            }} />
                        </Box>
                        <form.AppField name='name' children={( field ) => <field.Text fullWidth={true}/> }/>
                        <form.AppField name='email'  children={(field ) => <field.Text fullWidth={true}/>} />
                        <form.AppField name="country" children={(field) => <field.SelectField data={countryOptions}/>} />
                        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                            <form.Field name="telephones" mode="array">
                                {(field) => {
                                    return (
                                        <>
                                            {field.state.value.map((_, i) => {
                                            return (
                                                <form.AppField key={i} name={`telephones[${i}]`} children={(field) => {
                                                        return (
                                                            <Box sx={{display: 'inline-block', mr: 2}}>
                                                                <field.Text  label={t('form.telephone')}/>
                                                            </Box>
                                                        )
                                                    }
                                                }>
                                                </form.AppField>
                                            )
                                            })}
                                            <Box>
                                                <Button onClick={() => field.pushValue("")}>
                                                    {t('Agencies.Add')}
                                                </Button>
                                                <Button color="error" onClick={() => field.removeValue(field.getMeta.length-1)}>
                                                    {t('Agencies.Remove')}
                                                </Button>
                                            </Box>
                                        </>
                                    )
                                }}
                            </form.Field>
                        </Box>
                        <form.AppField name='description' children={( field ) => <field.TextArea />} />
                        <form.Subscribe selector={(state) => state.isValid} children=
                        {(isValid) => {
                            if (isValid) return null
                            
                            return (
                                <AlertError />
                            )
                        }}/>
                        <Button type='submit' variant='contained' sx={{mt: '1%'}}>{t('Agencies.Save')}</Button>
                    </Box>
                </Box>
                <Box flex={1}>
                    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mt: 1 }}>
                        <Typography variant="h6">{t("Agencies.NumberOfEstates")}: 25</Typography>
                    </Box>
                    {changePasswordOpen ? 
                        <Box component="form" noValidate autoComplete="off" onSubmit={handlePasswordSubmit}
                            sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mt: 1 }}>
                            <Typography variant="h6">{t("Agencies.ChangePassword")}</Typography>
                            <passwordForm.AppField name="oldPassword" children={(field) => <field.Text type="password" fullWidth />} />
                            <passwordForm.AppField name="newPassword" children={(field) => <field.Text type="password" fullWidth />} />
                            <passwordForm.AppField name="confirmPassword" children={(field) => <field.Text type="password" fullWidth />} />
                            <form.Subscribe selector={(state) => state.isValid} children=
                            {(isValid) => {
                                if (isValid) return null
                                
                                return (
                                    <AlertError />
                                )
                            }}/>
                            <Button type="submit" variant="contained" sx={{ m: 1 }}>{t("Agencies.UpdatePassword")}</Button>
                            <Button  variant="outlined" sx={{ m: 1 }} onClick={() => setChangePasswordOpen(false)}>{t("Agencies.Close")}</Button>
                        </Box>
                        :
                        <Button variant="contained" sx={{ mt: 1 }} onClick={() => setChangePasswordOpen(true)}>{t("Agencies.ChangePassword")}</Button>
                    }
                </Box>
            </Stack>
        </Container>
    )
}