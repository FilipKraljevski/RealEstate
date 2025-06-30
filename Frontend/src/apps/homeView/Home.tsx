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
                            <ImageListItemBar title={item.title}
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
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];