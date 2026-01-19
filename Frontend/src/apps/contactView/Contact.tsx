import { Box, Button, Container, Divider, Typography } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useAppForm } from '../../common/form'
import AlertError from '../../common/form/components/AlertError'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { sendContact } from '../../common/Service/UserService'
import { useNotification } from '../../common/Context/NotificationProvider'
import type { Response } from '../../common/Service/ServiceConfig'

export const Route = createLazyRoute('/Contact')({
    component: Contact,
})

export default function Contact() {

    const { t } = useTranslation()
    const { notify } = useNotification()

    const { mutate } = useMutation({
        mutationFn: sendContact,
        onSuccess: () => notify("success"),
        onError: (err: Response) => notify("error", err.message)
    })

    const validationSchema = z.object({
        name: z.string().nonempty(t('error.Required')),
        email: z.string().email(t('error.Email')),
        subject: z.string().nonempty(t('error.Required')),
        body: z.string().nonempty(t('error.Required'))
    })

    const form = useAppForm({
        defaultValues: { 
            name: "",
            email: "",
            subject: "",
            body: ""
        },
        validators: {
            onSubmit: validationSchema
        },
        onSubmit: ({value}) => {
            mutate(value)
        }
    })

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>{t("Contact.ContactUs")}</Typography>
            <Typography sx={{mb: '1%', fontWeight: "bold"}}>{t("Contact.ContactInfo")}</Typography>
            <Divider />
            <Typography sx={{mb: '1%', mt: 1}}>{t("Contact.Telephone")} <b>+389 78 123 456</b></Typography>
            <Typography sx={{mb: '1%'}}>{t("Contact.Email")}</Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleOnSubmit} sx={{ width: { xs: "100%", sm: "50%" } }}>
                <form.AppField name='name' children={( field ) => <field.Text fullWidth={true}/> }/>
                <form.AppField name='email'  children={(field ) => <field.Text fullWidth={true}/>} />
                <form.AppField name='subject' children={( field ) => <field.Text fullWidth={true}/>} />
                <form.AppField name='body' children={( field ) => <field.TextArea />} />
                <form.Subscribe selector={(state) => state.isValid} children=
                {(isValid) => {
                    if (isValid) return null
                    
                    return (
                        <AlertError />
                    )
                }}/>
                <Button type='submit' variant='contained' sx={{mt: '1%'}}>{t("Contact.Submit")}</Button>
            </Box>
        </Container>
    )
}