import { Box, Button, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { createLazyRoute, Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useSuspenseQuery } from "@tanstack/react-query";
import { estateDetailsQueryOptions } from "../../common/Routing/RouteQueries";

export const Route = createLazyRoute("/RealEstateDetails/$id")({
    component: RealEstateDetails
})

export default function RealEstateDetails() {
    const { t } = useTranslation()
    const [current, setCurrent] = useState(0)

    const { id } = useParams({ from: "/RealEstateDetails/$id" });
    const estateDetailsQuery = useSuspenseQuery(estateDetailsQueryOptions(id))
    const estate = estateDetailsQuery.data

    const showPrev = () => {
        setCurrent(i => Math.max(i - 1, 0))
    }
    const showNext = () => {
      setCurrent(i => Math.min(i + 1, estate ? estate.images.length - 1 : 0))
    }

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            {estate && <Box>
            <Typography variant='h4' sx={{mb: '1%'}}>{estate.title}</Typography>
            <Divider />

            <Grid container spacing={1} columns={{ sm: 4, md: 12 }} sx={{mt: 1}}>
                <Grid size={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <IconButton onClick={showPrev} disabled={current === 0}sx={{ position: 'absolute', left: 0 }}>
                            <ArrowBackIos />
                        </IconButton>
                        <Paper component="img" src={estate.images[current].content} alt={`Slide ${current + 1}`} sx={{width: '100%', height: '300px'}}/>
                        <IconButton onClick={showNext} disabled={current === estate.images.length - 1} sx={{position: 'absolute', right: 0 }}>
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Estate')}</Typography>
                        <Typography padding={1}><b>{t(`form.purchaseType`)}: </b>
                            {t(`Purchase.${estate.purchaseType.toString()}`)}
                            </Typography>
                        <Typography padding={1}><b>{t(`form.published`)}: </b>
                            {estate.publishedDate.toString()}
                        </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Location').substring(0, 8)}</Typography>
                        <Typography padding={1}><b>{t(`form.country`)}: </b> 
                            {t(`Country.${estate.country.toString()}`)}
                        </Typography>
                        <Typography padding={1}><b>{t(`form.city`)}: </b> 
                            {estate.city.toString()}
                        </Typography>
                        <Typography padding={1}><b>{t(`form.municipality`)}: </b> 
                            {estate.municipality.toString()}
                        </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Description')}</Typography>
                        <Typography padding={1}>{estate.description}</Typography>
                    </Paper>
                </Grid>
                <Grid size={4}>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}} bgcolor={'lightgray'} padding={1}>{t('RealEstate.General')}</Typography>
                        <Typography padding={1}><b>{t(`form.area`)}: </b> {estate.area.toString()}</Typography>
                        <Typography padding={1}><b>{t(`form.rooms`)}: </b> {estate.rooms.toString()}</Typography>
                        <Typography padding={1}><b>{t(`form.yearConstruction`)}: </b> {estate.yearOfConstruction.toString()}</Typography>
                        <Typography padding={1}><b>{t(`form.floor`)}: </b> {estate.floor.toString()}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Financial')}</Typography>
                        <Typography padding={1}><b>{t(`form.estateType`)}: </b> 
                                {t(`Estate.${estate.estateType.toString()}`)}
                        </Typography>
                        <Typography padding={1}><b>{t(`form.price`)}: </b> 
                                {estate.price.toString()}
                        </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Additional')}</Typography>
                        {estate.additionalEstateInfo.map((item) => (
                            <Typography padding={1}><b>{item.name}:</b> ✅</Typography>
                        ))}
                    </Paper>
                    <Paper variant="outlined" sx={{mt: 1}}>
                        <Typography variant="h6" padding={1} bgcolor={'lightgray'} sx={{fontWeight: "bold"}}>{t('RealEstate.Agency').substring(0, 8)}</Typography>
                        <Typography padding={1}><b>{t('RealEstate.Agency')}</b> {estate.agency.name}</Typography>
                        <Button component={Link} href={`/AgencyDetails/${estate.agency.id}`} variant='contained' sx={{ m: 1}}>
                            {t(`RealEstate.AgencyInfo`)}
                        </Button>
                    </Paper>
                </Grid>
            </Grid> 
            </Box>}
        </Container>
    )
}