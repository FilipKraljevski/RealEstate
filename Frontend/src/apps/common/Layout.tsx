import { Box } from "@mui/material";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {

    return (
        <Box sx={{ display: 'flex',flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
            <Header/>
            <Body />
            <Footer />
        </Box>
    )
}