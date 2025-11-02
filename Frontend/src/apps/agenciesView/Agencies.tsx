import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Divider, IconButton, Typography } from '@mui/material'
import { createLazyRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getEnumTypeKey } from '../../common/Logic/EnumHelper'
import { Country } from '../../common/Domain/Country'
import { Add } from '@mui/icons-material'

export const Route = createLazyRoute('/Agencies')({
    component: Agencies,
})

export default function Agencies() {

    const { t } = useTranslation()
    
    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{mb: '1%'}}>{t('Agencies.Agencies')}</Typography>
                <IconButton>
                    <Add/>
                    {t('Agencies.Add')}
                </IconButton>
            </Box>
            <Divider />

            <Box sx={{mt: 1, display: 'flex', flexWrap: 'wrap'}}>
                {itemData.map((item) => (
                    <Card sx={{ maxWidth: 350, mr: 2, mt: 2 }} key={item.id}>
                        <CardActionArea component={Link} to={`/AgencyDetails/${item.id}`}>
                            <CardMedia component="img" image={item.img} alt={item.name} sx={{ width: '100%', objectFit: 'cover' }}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{item.name}</Typography>
                                <Typography gutterBottom variant="h6" component="div">{t('Agencies.Country')}: 
                                    {t(`Country.${getEnumTypeKey(item.location, Country)}`)}
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
//API call
const itemData = [
    {
        id: "id",
        img: '/GramadaLogoUrl.png',
        name: 'Gramada Agency',
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        location: 1,
        telephones: ["+389 78 123 456", "+389 78 123 456", "+389 78 123 456"],
        email: "contact@agencija.com",
        numberOfEstates: 38
    },
    {
        id: "id1",
        img: '/GramadaLogoUrl.png',
        name: 'Gramada Agency',
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        location: 1,
        telephones: ["+389 78 123 456", "+389 78 123 456", "+389 78 123 456"],
        email: "contact@agencija.com",
        numberOfEstates: 38
    },
    {
        id: "id2",
        img: '/GramadaLogoUrl.png',
        name: 'Gramada Agency',
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        location: 1,
        telephones: ["+389 78 123 456", "+389 78 123 456", "+389 78 123 456"],
        email: "contact@agencija.com",
        numberOfEstates: 38
    },
    {
        id: "id3",
        img: '/GramadaLogoUrl.png',
        name: 'Gramada Agency',
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        location: 1,
        telephones: ["+389 78 123 456", "+389 78 123 456", "+389 78 123 456"],
        email: "contact@agencija.com",
        numberOfEstates: 38
    },
    {
        id: "id4",
        img: '/GramadaLogoUrl.png',
        name: 'Gramada Agency',
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        location: 1,
        telephones: ["+389 78 123 456", "+389 78 123 456", "+389 78 123 456"],
        email: "contact@agencija.com",
        numberOfEstates: 38
    }
  ];