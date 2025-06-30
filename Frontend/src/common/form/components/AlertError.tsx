import { Alert, AlertTitle, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AlertError() {
    const { t } = useTranslation()

    return (
        <>
            <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>{t('error.Error')}</AlertTitle>
                <Typography>{t('error.ErrorInfo')}</Typography>
            </Alert> 
        </>
    )
}