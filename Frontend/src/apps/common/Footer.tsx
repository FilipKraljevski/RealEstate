import { Box, IconButton, Link, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {

    return (
        <Box sx={{backgroundColor: '#2B2B2B', display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' }, padding: '16px', color: "white"}}>
            <Box>
                <Typography sx={{ marginTop: 1 }}>Контакт</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline'}}>
                    <IconButton component='a' href='https://facebook.com' target='_blank' rel='noopener noreferrer' sx={{ color: 'white' }}>
                        <FacebookIcon />
                        <Typography>Агенција</Typography>
                    </IconButton>
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
                <Typography sx={{ marginTop: 1 }}>Адреса</Typography>
                <Box sx={{ color: 'white','&:hover': { color: 'blue' }, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    height: '100%' }}>
                    <Typography>Видое Смилевски Бато, Аеродром</Typography>
                    <Typography>Скопје, Македонија</Typography>
                </Box>
            </Box>
            <Box>
                <Typography sx={{ marginTop: 1 }}>Политика на приватност</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                    <Link sx={{color: 'white'}} underline='none'>Приватност</Link>
                </Box>
            </Box>
        </Box>
    )
}