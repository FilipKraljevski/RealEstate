import { useMutation } from "@tanstack/react-query";
import { createLazyRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { login } from "../../common/Service/UserService";
import z from "zod";
import { useAppForm } from "../../common/form";
import { Box, Button, Paper, Typography } from "@mui/material";
import AlertError from "../../common/form/components/AlertError";
import { useEffect, useState } from "react";
import { CodeVerificationDialog } from "../common/CodeVerificationDialog";
import { useAuth } from "../../common/Context/AuthProvider";

export const Route = createLazyRoute('/Login')({
    component: Login,
})

export default function Login() {

    const { t } = useTranslation()
    const [showDialog, setShowDialog] = useState(false);
    const [codeId, setCodeId] = useState("")
    const { login: setJwt } = useAuth()

    const { mutate, isSuccess, data } = useMutation({
        mutationFn: login
    })

    useEffect(() => {
        const expiry = localStorage.getItem("codePopupExpiry");
        if (expiry && Date.now() < Number(expiry)) {
            setShowDialog(true);
        }
    }, []);

    const validationSchema = z.object({
        email: z.string().email(t('error.Email')),
        password: z.string().nonempty(t('error.Required')),
    })

    const form = useAppForm({
        defaultValues: { 
            email: "",
            password: ""
        },
        validators: {
            onSubmit: validationSchema
        },
        onSubmit: ({value}) => {
            console.log(value)
            const payload = {
                ...value,
                codeId: "",
                code: ""
            }
            mutate(payload)
            setCodeId(data?.data ?? "")
            setShowDialog(true)
        }
    })

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    
    const handleVerified = (closePopup: any, code: string) => {
        const payload = {
            ...form.state.values,
            codeId: codeId,
            code: code
        }
        mutate(payload)
        if(isSuccess){
            closePopup()
            setJwt(data.data)
        }
    };
    
    return (
        <Box sx={{ minHeight: '10vh', display: 'grid', placeItems: 'center', 
            bgcolor: (theme) => (theme.palette.mode === 'light' ? '#f5f5f5' : 'background.default'), p: 2 }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 420, p: 4, }} >
                <Typography variant="h5" component="h1" gutterBottom>
                    Log in
                </Typography>
            <Box component="form"  noValidate autoComplete="off" onSubmit={handleOnSubmit}>
                <form.AppField name='email'  children={(field ) => <field.Text fullWidth={true}/>} />
                <form.AppField name='password'  children={(field ) => <field.Text type="password" fullWidth={true}/>} />
                <form.Subscribe selector={(state) => state.isValid} children=
                    {(isValid) => {
                        if (isValid) return null
                        
                        return (
                            <AlertError />
                        )
                    }}/>
                <Button type='submit' variant='contained' sx={{mt: '1%'}}>{t("Login.Login")}</Button>
            </Box>
        </Paper>
        <CodeVerificationDialog open={showDialog} onClose={() => setShowDialog(false)} onVerified={handleVerified} />
    </Box>
  );
};