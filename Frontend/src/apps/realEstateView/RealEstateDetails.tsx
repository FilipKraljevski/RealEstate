import { Box, Button, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { createLazyRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

export const Route = createLazyRoute("/RealEstateDetails/$id")({
    component: RealEstateDetails
})

export default function RealEstateDetails() {

    const { t } = useTranslation()
    const [current, setCurrent] = useState(0)

    const showPrev = () => {
        setCurrent(i => Math.max(i - 1, 0))
    }
    const showNext = () => {
      setCurrent(i => Math.min(i + 1, itemData.img.length - 1))
    }

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>{itemData.name}</Typography>
            <Divider />

            <Grid container spacing={1} columns={{ sm: 4, md: 12 }} sx={{mt: 1}}>
                <Grid size={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <IconButton onClick={showPrev} disabled={current === 0}sx={{ position: 'absolute', left: 0 }}>
                            <ArrowBackIos />
                        </IconButton>
                        <Paper component="img" src={itemData.img[current]} alt={`Slide ${current + 1}`} sx={{width: '100%', height: '300px'}}/>
                        <IconButton onClick={showNext} disabled={current === itemData.img.length - 1} sx={{position: 'absolute', right: 0 }}>
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Estate')}</Typography>
                        {itemData.estate.map((item) => (
                            <Typography padding={1}><b>{t(`form.${item.label}`)}: </b>
                                {item.enum ? t(`Purchase.${item.value.toString()}`) : item.value.toString()}
                            </Typography>
                        ))}
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Location').substring(0, 8)}</Typography>
                            {itemData.location.map((item) => (
                                <Typography padding={1}><b>{t(`form.${item.label}`)}: </b> 
                                    {item.enum ? t(`Country.${item.value.toString()}`) : item.value.toString()}
                                </Typography>
                            ))}
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Description')}</Typography>
                        <Typography padding={1}>{itemData.description}</Typography>
                    </Paper>
                </Grid>
                <Grid size={4}>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}} bgcolor={'lightgray'} padding={1}>{t('RealEstate.General')}</Typography>
                        {itemData.generalInformation.map((item) => (
                            <Typography padding={1}><b>{t(`form.${item.label}`)}: </b> {item.value.toString()}</Typography>
                        ))}
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Financial')}</Typography>
                        {itemData.financial.map((item) => (
                            <Typography padding={1}><b>{t(`form.${item.label}`)}: </b> 
                                {item.enum ? t(`Estate.${item.value.toString()}`) : item.value.toString()}
                            </Typography>
                        ))}
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Additional')}</Typography>
                        {itemData.additioanlInformations.map((item) => (
                            <Typography padding={1}><b>{item}:</b> ✅</Typography>
                        ))}
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Agency').substring(0, 8)}</Typography>
                        <Typography padding={1}><b>{t('RealEstate.Agency')}</b> {itemData.agencyName}</Typography>
                        <Button component={Link} href={`/AgencyDetails/${itemData.agencyId}`} variant='contained' sx={{ m: 1}}>
                            {t(`RealEstate.AgencyInfo`)}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>  
        </Container>
    )
}

const itemData = {
    id: "id",
    img: ['/GramadaLogoUrl.png', '/LivingRoomHome.jpg', '/LookingProperty.jpg', '/YourOffer.jpg'],
    name: 'Delux Apartment',
    description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    estate: [
        {
            label: 'purchaseType',
            value: "Purchase",
            enum: true
        },
        {
            label: 'published',
            value: new Date(Date.now())
        }
    ],
    location: [
        {
            label: 'country',
            value: "Macedonia",
            enum: true
        },
        {
            label: 'city',
            value: 'Skopje'
        },
        {
            label: 'municipality',
            value: 'Aerodrom'
        },
    ],
    financial: [
        {
            label: 'estateType',
            value: "Apartment",
            enum: true
        },
        {
            label: 'price',
            value: 100000
        },
    ],
    generalInformation: [
        {
            label: 'area',
            value: 100
        },
        {
            label: 'rooms',
            value: 5
        },
        {
            label: 'yearConstruction',
            value: 2023
        },
        {
            label: 'floor',
            value: 2
        },
    ],
    additioanlInformations: ['terrace', 'heating', 'parking', 'basement'],
    agencyId: 'Id',
    agencyName: 'Gramada Agency'
}