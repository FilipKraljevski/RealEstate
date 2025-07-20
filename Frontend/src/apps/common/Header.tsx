import { Box, AppBar, Toolbar, IconButton, Drawer, useTheme, useMediaQuery, Typography, FormControl, Select, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from "./Navigation";
import { useState } from "react";
import MobileNavigation from "./MobileNavigation";
import { useTranslation } from "react-i18next";
import { languageData } from "../../common/Repository/LanguageData";

export default function Header() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

    return (
      <Box>
        <AppBar position="static" sx={{backgroundColor: '#2B2B2B'}}>
          <Toolbar>
            {isSmallScreen ? (
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}} 
                onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            ) : (
              <Box >
                <Navigation />
              </Box>
            )}
            <Box sx={{ marginLeft: 'auto' }}>
              <FormControl sx={{borderBlockColor: 'white'}}>
                <Select value={i18n.language} onChange={handleLanguageChange} sx={{ color: 'white', 
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white'}},
                  '& .MuiSvgIcon-root': { color: 'white'} }}>
                  {languageData.map((text, index) => (
                    <MenuItem key={index} value={text}>{t(text)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} 
          sx={{display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }}}>
          <Typography variant='h6' sx={{ textAlign: 'center', mb: 2 }}>
            {t('header.Menu')}
          </Typography>
          <Box onClick={handleDrawerToggle} >
            <MobileNavigation />
          </Box>
        </Drawer>
      </Box>
    );
  }