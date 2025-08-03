import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TablePagination, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { createLazyRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EstateType } from '../../common/Domain/EstateType'
import { PurchaseType } from '../../common/Domain/PurchaseType'
import { Country } from '../../common/Domain/Country'
import { enumToOptions, getEnumTypeKey } from '../../common/Logic/EnumHelper'

export const Route = createLazyRoute('/RealEstate')({
    component: RealEstate,
})

interface Filter {
    estateFor: PurchaseType,
    estateType: EstateType,
    country: Country,
    city: string,
    agency: string
    fromArea: number,
    toArea: number,
    fromPrice: number,
    toPrice: number
}

interface Item {
    value: any,
    label: string
}

export default function RealEstate() {

    const { t } = useTranslation()
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openFilters, setOpenFilters] = useState(true)
    const [filter, setFilters] = useState<Partial<Filter>>({})
    const [cityOptions, setCityOptions] = useState<Item[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const purchaseOptions = enumToOptions(PurchaseType)
    const estateOptions = enumToOptions(EstateType)
    const countryOptions = enumToOptions(Country)

    const getAgencies = (): Item[] => {
        return itemDataAgencies
    }

    const agencyOptions = getAgencies()

    useEffect(() => {
        setCityOptions(getCities(filter.country))
    }, [filter.country])

    useEffect(() => {
        setOpenFilters(isSmallScreen ? false : true)
    }, [isSmallScreen])

    const getCities = (countyId: any) => {
        return itemDataCities
    }

    const handleOnChangeFilters = (name: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
          }))
    }

    const handleOnChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleOnChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOnSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const Adornment = (value: string) => {
        return <InputAdornment position="end">{value}</InputAdornment>
    }

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>Estates</Typography>
            <Divider />

            <Box sx={{mt: 1}}>
                {isSmallScreen && <Button type='button' variant='contained' sx={{mt: '1%'}} onClick={() => setOpenFilters(!openFilters)}>
                    {t('RealEstate.OpenFilter')}
                </Button>}
                {openFilters &&  <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between', mt: 1, flexGrow: 1}}
                    component="form" noValidate autoComplete="off" onSubmit={handleOnSubmit} width='100%' >
                    <Grid size={3} >
                        <FormControl fullWidth>
                        <InputLabel id='filter.estateFor'>{t(`filter.estateFor`)}</InputLabel>
                        <Select value={filter.estateFor} labelId='filter.estateFor' label={t(`filter.${filter.estateFor}`)}
                            onChange={(value) => handleOnChangeFilters("estateFor", value)}>
                            {purchaseOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{t(`option.${item.label}`)}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.estateType'>{t(`filter.estateType`)}</InputLabel>
                        <Select fullWidth value={filter.estateType} labelId='filter.estateType' label={t(`filter.${filter.estateType}`)}
                            onChange={(value) => handleOnChangeFilters("estateType", value)}>
                            {estateOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{t(`option.${item.label}`)}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.country'>{t(`filter.country`)}</InputLabel>
                        <Select fullWidth value={filter.country} labelId='filter.country' label={t(`filter.${filter.country}`)}
                            onChange={(value) => handleOnChangeFilters("country", value)}>
                            {countryOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{t(`option.${item.label}`)}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.city'>{t(`filter.city`)}</InputLabel>
                        <Select fullWidth value={filter.city} labelId='filter.city' label={t(`filter.${filter.city}`)}
                            onChange={(value) => handleOnChangeFilters("city", value)}>
                            {cityOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.agency'>{t(`filter.agency`)}</InputLabel>
                        <Select fullWidth value={filter.agency} labelId='filter.agency' label={t(`filter.${filter.agency}`)}
                            onChange={(value) => handleOnChangeFilters("agency", value)}>
                            {agencyOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={t(`filter.fromArea`)} value={filter.fromArea} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("fromArea", e.target.value)}></TextField>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={t(`filter.toArea`)} value={filter.toArea} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("toArea", e.target.value)}></TextField>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={t(`filter.fromPrice`)} value={filter.fromPrice} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("fromPrice", e.target.value)} slotProps={{ input: {endAdornment: Adornment("€")}}}></TextField>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={t(`filter.toPrice`)} value={filter.toPrice} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("toPrice", e.target.value)} slotProps={{ input: {endAdornment: Adornment("€")}}}></TextField>
                    </Grid>
                    <Button type='submit' variant='contained'>{t('RealEstate.Submit')}</Button>
                </Grid>}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', mt: 1 }}>
                    {itemData.map(item => (
                        <Card key={item.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardHeader title={item.name} sx={{ backgroundColor: 'lightgray'}}/>
                            <CardActionArea component={Link} to={`/AgencyDetails/${item.id}`} sx={{ display: 'flex', 
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

//API CALL
const itemDataAgencies: Item[] = [
    {
        value: "id",
        label: "Gramada Agency"
    },
]

const itemDataCities: Item[] = [
    {
        value: "id",
        label: "Skopje"
    },
]

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
]