import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from "./Navigation";

export default function Header() {

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Navigation />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }