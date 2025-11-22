import { Box, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { createLazyRoute, Link, useParams } from "@tanstack/react-router";
import { useTranslation } from 'react-i18next';
import { Country } from "../../common/Domain/Country";
import { getEnumTypeKey } from "../../common/Logic/EnumHelper";
import { Edit } from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { agencyDetailsQueryOptions } from "../../common/Routing/RouteQueries";

export const Route = createLazyRoute("/AgencyDetails/$id")({
    component: AgencyDetails
})

export default function AgencyDetails() {

    const { t } = useTranslation()

    const { id } = useParams({ from: "/AgencyDetails/$id" })
    const agencyDetailsQuery = useSuspenseQuery(agencyDetailsQueryOptions(id))
    const agency = agencyDetailsQuery.data
    
    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{mb: '1%'}}>{agency.name}</Typography>
                <IconButton component={Link} to={`/AgencyForm/${agency.id}`}>
                    <Edit/>
                </IconButton>
            </Box>
            <Divider />

            <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }} sx={{mt: 1}}>
                <Grid size={8}>
                    <Paper component='img' src={agency.profilePicture} alt={agency.name} sx={{ width: '100%', height: '300px'}}/>
                    <Paper variant="outlined">
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('Agencies.Country')}</Typography>
                        <Typography padding={1}>{t(`Country.${getEnumTypeKey(agency.country, Country)}`)}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('Agencies.Description')}</Typography>
                        <Typography padding={1}>{agency.description}</Typography>
                    </Paper>
                </Grid>
                <Grid size={4}>
                    <Paper variant="outlined">
                        <Typography variant="h6" sx={{fontWeight: "bold"}} bgcolor={'lightgray'} padding={1}>{t('Agencies.Contact')}</Typography>
                        <Typography padding={1}><b>{t('Agencies.Telephones')}</b><br/>
                            {agency.telephones.map((tel) => ( <span>{tel} <br/></span>))}
                        </Typography>
                        <Typography padding={1}><b>{t('Agencies.Email')}</b> {agency.email}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('Agencies.Estates')}</Typography>
                        <Typography padding={1}><b>{t('Agencies.NoEstates')}</b> {agency.numberOfEstates}</Typography>
                    </Paper>
                </Grid>
            </Grid>       
        </Container>
    )
}