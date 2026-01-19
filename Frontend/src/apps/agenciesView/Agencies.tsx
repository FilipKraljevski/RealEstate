import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Divider, IconButton, Typography } from '@mui/material'
import { createLazyRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getEnumTypeKey } from '../../common/Logic/EnumHelper'
import { Country } from '../../common/Domain/Country'
import { Add } from '@mui/icons-material'
import { useSuspenseQuery } from '@tanstack/react-query'
import { agenciesQueryOptions } from '../../common/Routing/RouteQueries'
import { useAuth } from '../../common/Context/AuthProvider'

export const Route = createLazyRoute('/Agencies')({
    component: Agencies,
})

export default function Agencies() {

    const { t } = useTranslation()
    const { user } = useAuth();

    const agenciesQuery = useSuspenseQuery(agenciesQueryOptions())
    const agencies = agenciesQuery.data
    
    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{mb: '1%'}}>{t('Agencies.Agencies')}</Typography>
                {user && user.isAdmin && <IconButton component={Link} to={`/AgencyForm`}>
                    <Add/>
                    {t('Agencies.Add')}
                </IconButton> }
            </Box>
            <Divider />

            <Box sx={{mt: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {agencies && agencies.map((item) => (
                    <Card sx={{ width: 350, mr: 2, mt: 2 }} key={item.id}>
                        <CardActionArea component={Link} to={`/AgencyDetails/${item.id}`}>
                            <CardMedia component="img" src={`data:image;base64,${item.profilePicture}`} alt={item.name} sx={{ objectFit: 'fill', width: 350, height: 200 }}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{item.name}</Typography>
                                <Typography gutterBottom variant="h6" component="div">{t('Agencies.Country')}: 
                                    {t(`Country.${getEnumTypeKey(item.country, Country)}`)}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{item.description.substring(0, 100)}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}