import { Box, Button, Container, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EstateType } from '../../common/Domain/EstateType'
import { PurchaseType } from '../../common/Domain/PurchaseType'
import { Country } from '../../common/Domain/Country'
import { enumToOptions } from '../../common/Logic/EnumHelper'

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
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openFilters, setOpenFilters] = useState(true)
    const [filter, setFilters] = useState<Partial<Filter>>({})
    const [cityOptions, setCityOptions] = useState<Item[]>([])

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

    const Adornment = (value: string) => {
        return <InputAdornment position="end">{value}</InputAdornment>
    }

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>Estates</Typography>
            <Divider />

            <Box sx={{mt: '1%'}}>
                {isSmallScreen && <Button type='button' variant='contained' sx={{mt: '1%'}} onClick={() => setOpenFilters(!openFilters)}>
                    Open filters
                </Button>}
                {openFilters &&  <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{justifyContent: 'space-between'}}>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.estateFor'>{t(`form.${filter.estateFor}`)}</InputLabel>
                        <Select value={filter.estateFor} labelId='filter.estateFor' label={t(`form.${filter.estateFor}`)}
                            onChange={(value) => handleOnChangeFilters("estateFor", value)}>
                            {purchaseOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.estateType'>{t(`form.${filter.estateType}`)}</InputLabel>
                        <Select fullWidth value={filter.estateType} labelId='filter.estateType' label={t(`form.${filter.estateType}`)}
                            onChange={(value) => handleOnChangeFilters("estateType", value)}>
                            {estateOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.country'>{t(`form.${filter.country}`)}</InputLabel>
                        <Select fullWidth value={filter.country} labelId='filter.country' label={t(`form.${filter.country}`)}
                            onChange={(value) => handleOnChangeFilters("country", value)}>
                            {countryOptions.map((item: Item) => {
                                return (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                        <InputLabel id='filter.city'>{t(`form.${filter.city}`)}</InputLabel>
                        <Select fullWidth value={filter.city} labelId='filter.city' label={t(`form.${filter.city}`)}
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
                        <InputLabel id='filter.agency'>{t(`form.${filter.agency}`)}</InputLabel>
                        <Select fullWidth value={filter.agency} labelId='filter.agency' label={t(`form.${filter.agency}`)}
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
                        <TextField label={filter.fromArea} value={filter.fromArea} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("fromArea", e.target.value)}></TextField>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={filter.toArea} value={filter.toArea} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("toArea", e.target.value)}></TextField>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={filter.fromPrice} value={filter.fromPrice} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("fromPrice", e.target.value)} slotProps={{ input: {endAdornment: Adornment("€")}}}></TextField>
                    </Grid>
                    <Grid size={2}> 
                        <TextField label={filter.toPrice} value={filter.toPrice} fullWidth type='number'
                            onChange={(e) => handleOnChangeFilters("toPrice", e.target.value)} slotProps={{ input: {endAdornment: Adornment("€")}}}></TextField>
                    </Grid>
                </Grid>}
                <Divider />
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