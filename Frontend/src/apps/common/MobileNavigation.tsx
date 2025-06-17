import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { navigationData } from "../../common/Repository/NavigationData";
import { useTranslation } from "react-i18next";

export default function MobileNavigation() {

    const { t } = useTranslation()

    return (
        <List>
            {navigationData.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton component={Link} to={item.to}>
                        <ListItemText primary={t(`navigation.${item.label}`)}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}