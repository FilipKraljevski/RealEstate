import { Box, Button, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { createLazyRoute, Link } from '@tanstack/react-router'
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';

export const Route = createLazyRoute('/')({
    component: Home,
})

export default function Home() {

    const { t } = useTranslation()

    return (
        <Box>
            <Box sx={{ position: 'relative', width: '100%', height: '550px', mb: '1%' }}>
                <Box component='img' src='/LivingRoomHomeResized.jpg' alt='Living Room Interior' sx={{ width: '100%', height: '100%', 
                    objectFit: 'cover' }}/>
                <Box sx={{ position: 'absolute',top: '0',left: '50%',transform: 'translateX(-50%)', textAlign: 'center',color: 'black',
                    padding: '8px 16px',borderRadius: '4px', mt: 5}}>
                    <Typography variant="h4">{t('Home.Vision')}</Typography>
                    <Button href='/AboutUs' component={Link} style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '8px 16px', marginTop: '2%'}}>
                            {t('Home.MoreInfo')}
                    </Button>
                </Box>
            </Box>
            <Container>
                <Typography variant='h4'>{t('Home.EstatesByCategory')}</Typography>
                <ImageList cols={3} sx={{ width: '100%', height: '500px'}}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} 
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`} alt={item.title} loading='lazy'/>
                            <ImageListItemBar title={t(`Estate.${item.title}`)}
                                actionIcon={
                                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.title}`}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
            <Container>
                <Box sx={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', mb: '1%' }}>
                    <Box component='img' src='/LookingProperty.jpg' alt='House' sx={{ width: '50%', height: '250px', 
                        objectFit: 'cover', display: { xs: 'none', sm: 'block' } }}/>
                    <Box sx={{ textAlign: 'center', mt: 0}}>
                        <Typography variant='h5'>{t('Home.LookingProperty')}</Typography>
                        <Typography>{t('Home.LookingPropertyInfo')}</Typography>
                        <Button component={Link} href='/LookingProperty' variant='contained' color='primary' style={{ color:'white', 
                            padding: '8px 16px', marginTop: '2%'}}>
                            {t('Home.EnterInformation')}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', mb: '1%' }}>
                    <Box component="img" src='/YourOffer.jpg' alt='House with keys' sx={{ width: '50%', height: '250px', 
                        objectFit: 'cover', display: { xs: 'none', sm: 'block' } }}/>
                    <Box sx={{ textAlign: 'center', mt: 0}}>
                        <Typography variant='h5'>{t('Home.YourOffer')}</Typography>
                        <Typography>{t('Home.YourOfferInfo')}</Typography>
                        <Button component={Link} href='/YourOffer' variant='contained' style={{ color:'white', 
                            padding: '8px 16px', marginTop: '2%'}}>
                            {t('Home.EnterInformation')}
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Container sx={{mb: '1%'}}>
                <Typography variant='h5'>{t('Home.Contact')}</Typography>
                <Button component={Link} href='/Contact' variant='contained' style={{ color:'white', padding: '8px 16px', marginTop: '2%'}}>
                    {t('Home.ContactUs')}
                </Button>
            </Container>
        </Box>
    )
}

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      title: 'House',
    },
    {
      img: 'https://images.unsplash.com/photo-1621919200669-2779566a6eaf',
      title: 'Apartment',
    },
    {
      img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      title: 'Office',
    },
    {
      img: 'https://images.unsplash.com/photo-1618179452716-0ad893855abe',
      title: 'Shop',
    },
    {
      img: 'https://images.unsplash.com/photo-1669003750652-2027bd69e7a1',
      title: 'Warehouse',
    },
    {
      img: 'https://images.unsplash.com/photo-1665065768323-e650fad10cca',
      title: 'Land',
    }
  ];