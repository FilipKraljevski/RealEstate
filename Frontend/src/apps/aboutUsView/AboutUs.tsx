import { Box, Container, Divider, Typography } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createLazyRoute('/AboutUs')({
    component: AboutUs,
})

export default function AboutUs() {

    const { t } = useTranslation()

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>{t('AboutUs.AboutUs')}</Typography>
            <Divider />
            <Box sx={{mt: '1%', mb: '1%'}}>
                <Typography> {t('AboutUs.Intro')}</Typography>
                <br/>
                <Typography>{t('AboutUs.ExploreListings')}</Typography>
                <br/>
                <Typography>{t('AboutUs.DeepDetails')}</Typography>
                <br/>
                <Typography>{t('AboutUs.ListYourProperty')}</Typography>
                <br/>
                <Typography>{t('AboutUs.CustomAlert')}</Typography>
            </Box>
        </Container>
    )
}