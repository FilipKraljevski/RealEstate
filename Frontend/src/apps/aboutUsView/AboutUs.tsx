import { Box, Container, Divider, Typography } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/AboutUs')({
    component: AboutUs,
})

function AboutUs() {

    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>За Нас</Typography>
            <Divider />
            <Box sx={{mt: '1%', mb: '1%'}}>
                <Typography> Агенцијата за недвижности ГРАМАДА со години наназат претставува синоним за квалитет, професионалност и 
                    стручност на полето на посредувањето при продажба и изнајмување на недвижен имот на територија на град Скопје, а 
                    потврдата за тоа се многу бројните задоволни клиенти.
                </Typography>
                <br/>
                <Typography>Ние нудиме, професионално посредување при барање за купување или изнајмување на соодветен стабен или 
                    деловен простор за Вашите потреби како и посредување и консултација при продажбата или издавањето на Вашиот станбен 
                    или деловен простор.  
                </Typography>
                <br/>
                <Typography>Посебно внимание посветуваме на понудата за изнајмувањето на луксузни објекти, како новост исто така 
                    воведовме понуда на изнајмување на туристички апартмани за краток престој во центарот на Скопје.
                </Typography>
                <br/>
                <Typography>Ние сме задоволни единствено кога сте и Вие задоволни.</Typography>
            </Box>
        </Container>
    )
}