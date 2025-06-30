import { Box, IconButton, Link, Typography } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from "react-i18next";

export default function Footer() {

    const { t } = useTranslation()

    return (
        <Box sx={{backgroundColor: '#2B2B2B', mt: '1%'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' }, padding: '16px', color: 'white'}}>
                <Box>
                    <Typography sx={{ marginTop: 1 }}>{t('footer.Contact')}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline'}}>
                        <IconButton component='a' href='mailto:someone@example.com' sx={{ color: 'white' }}>
                            <MailIcon />
                            <Typography>contact@agencija.com</Typography>
                        </IconButton>
                        <IconButton component='a' href='tel:+1234567890' sx={{ color: 'white' }}>
                            <PhoneIcon />
                            <Typography>+389 78 123 456</Typography>
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                </Box>
                <Box>
                    <Typography sx={{ marginTop: 1 }}>{t('footer.Politics')}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                        <Link sx={{color: 'white'}} underline='none'>{t('footer.Privacy')}</Link>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{color: 'white', mb: '1%'}}>© 2025 Agency, Inc</Typography>
        </Box>
    )
}