import { Add, Delete, Edit } from "@mui/icons-material";
import {Container, Typography, Divider, Box, Card, CardHeader, IconButton, CardActionArea, CardMedia, CardContent, TablePagination } from "@mui/material";
import { createLazyRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Country } from "../../common/Domain/Country";
import { EstateType } from "../../common/Domain/EstateType";
import { PurchaseType } from "../../common/Domain/PurchaseType";
import { getEnumTypeKey } from "../../common/Logic/EnumHelper";

export const Route = createLazyRoute('/YourEstates')({
    component: YourEstates,
})

export default function YourEstates(){

    const { t } = useTranslation()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleOnChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleOnChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{mb: '1%'}}>{t('RealEstate.YourEstates')}</Typography>
                <IconButton component={Link} to={`/EstateForm`} >
                    <Add/>
                    {t('RealEstate.Add')}
                </IconButton>
            </Box>
            <Divider />

            <Box sx={{mt: 1}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', mt: 1 }}>
                    {itemData.map(item => (
                        <Card key={item.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardHeader title={item.name} sx={{ backgroundColor: 'lightgray'}} 
                                action={
                                    <>
                                        <IconButton onClick={() => {console.log("Delete")}}>
                                            <Delete />
                                        </IconButton>
                                        <IconButton component={Link} to={`/EstateForm/${item.id}`} onClick={() => {console.log("Edit")}}>
                                            <Edit />
                                        </IconButton>
                                     </>
                                    }/>
                            <CardActionArea component={Link} to={`/RealEstateDetails/${item.id}`} sx={{ display: 'flex', 
                                flexDirection:{ xs: 'column', sm: 'row' }, alignItems: 'center', textDecoration: 'none' }} >
                                <CardMedia component="img" image={item.img[0]} alt={item.name} sx={{width: 350, objectFit: 'cover'}} />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.EstateFor`)}</strong> {t(`Purchase.${getEnumTypeKey(item.estateFor, PurchaseType)}`)}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.EstateType`)}</strong> {t(`Estate.${getEnumTypeKey(item.estateType, EstateType)}`)}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.Agency`)}</strong> {item.agency.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.Country`)}</strong> {t(`Country.${getEnumTypeKey(item.country, Country)}`)}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.Location`)}</strong> {item.location}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.Area`)}</strong> {item.area} m²
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>{t(`RealEstate.Price`)}</strong> {item.price} €
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description.substring(0, 100)}…
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'center', mt: 1}}>
                <TablePagination labelRowsPerPage={t('RealEstate.RowsPerPage')} component="div" count={100} page={page} 
                    onPageChange={handleOnChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleOnChangeRowsPerPage}/>
            </Box>
        </Container>
    )
}

const itemData = [
    {
        id: "Id",
        img: ["/GramadaLogoUrl.png"],
        name: "luxiourus",
        estateFor: 1,
        estateType: 1,
        agency: {
            id: "Id",
            name: "Gramada Agency"
        },
        country: 1,
        location: "Aerodrom, Skopje",
        area: 100,
        price: 100000 ,
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
    },
    {
        id: "Id1",
        img: ["/GramadaLogoUrl.png"],
        name: "luxiourus",
        estateFor: 1,
        estateType: 1,
        agency: {
            id: "Id",
            name: "Gramada Agency"
        },
        country: 1,
        location: "Aerodrom, Skopje",
        area: 100,
        price: 100000 ,
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
    },
    {
        id: "Id2",
        img: ["/GramadaLogoUrl.png"],
        name: "luxiourus",
        estateFor: 1,
        estateType: 1,
        agency: {
            id: "Id",
            name: "Gramada Agency"
        },
        country: 1,
        location: "Aerodrom, Skopje",
        area: 100,
        price: 100000 ,
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
    },
]