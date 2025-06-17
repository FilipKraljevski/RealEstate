import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

export default function Body() {
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Outlet />
        </Box>
    )
}