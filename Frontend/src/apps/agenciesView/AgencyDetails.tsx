import { Box, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { createLazyRoute } from "@tanstack/react-router";
import { useTranslation } from 'react-i18next';
import { Country } from "../../common/Domain/Country";
import { getEnumTypeKey } from "../../common/Logic/EnumHelper";
import { Edit } from "@mui/icons-material";

export const Route = createLazyRoute("/AgencyDetails/$id")({
    component: AgencyDetails
})

export default function AgencyDetails() {

    const { t } = useTranslation()
    
    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{mb: '1%'}}>{itemData.name}</Typography>
                <IconButton>
                    <Edit/>
                </IconButton>
            </Box>
            <Divider />

            <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }} sx={{mt: 1}}>
                <Grid size={8}>
                    <Paper component='img' src={itemData.img} alt={itemData.name} sx={{ width: '100%', height: '300px'}}/>
                    <Paper variant="outlined">
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('Agencies.Country')}</Typography>
                        <Typography padding={1}>{t(`Country.${getEnumTypeKey(itemData.location, Country)}`)}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('Agencies.Description')}</Typography>
                        <Typography padding={1}>{itemData.description}</Typography>
                    </Paper>
                </Grid>
                <Grid size={4}>
                    <Paper variant="outlined">
                        <Typography variant="h6" sx={{fontWeight: "bold"}} bgcolor={'lightgray'} padding={1}>{t('Agencies.Contact')}</Typography>
                        <Typography padding={1}><b>{t('Agencies.Telephones')}</b><br/>
                            {itemData.telephones.map((tel) => ( <span>{tel} <br/></span>))}
                        </Typography>
                        <Typography padding={1}><b>{t('Agencies.Email')}</b> {itemData.email}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('Agencies.Estates')}</Typography>
                        <Typography padding={1}><b>{t('Agencies.NoEstates')}</b> {itemData.numberOfEstates}</Typography>
                    </Paper>
                </Grid>
            </Grid>       
        </Container>
    )
}
//API call
const itemData = {
    id: "id",
    img: '/GramadaLogoUrl.png',
    name: 'Gramada Agency',
    description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    location: 1,
    telephones: ["+389 78 123 456", "+389 78 123 456", "+389 78 123 456"],
    email: "contact@agencija.com",
    numberOfEstates: 38
}