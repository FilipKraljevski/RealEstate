import { Box, Container, Divider, Typography } from '@mui/material'
import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/OurLocation')({
    component: OurLocation,
})

export default function OurLocation() {
    return (
        <Container sx={{textAlign: 'left', mt: '1%'}}>
            <Typography variant='h4' sx={{mb: '1%'}}>Мапа на нашата локација</Typography>
            <Divider />
            <Box sx={{mt: '1%', mb: '1%'}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.8729422886236!2d21.474321375793473!3d41.98153765893201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13543e1fc5bc0855%3A0x566eb1ed192202f2!2z0JPRgNCw0LzQsNC00LAgLSDQsNCz0LXQvdGG0LjRmNCwINC30LAg0L3QtdC00LLQuNC20L3QvtGB0YLQuA!5e0!3m2!1sen!2smk!4v1750181190474!5m2!1sen!2smk" 
                    width="100%" height="400" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </Box>
        </Container>
    )
}