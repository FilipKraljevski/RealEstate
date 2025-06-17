import { Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";
import { getActiveTabValue } from "../../common/Logic/NavigationHelper";
import { navigationData } from "../../common/Repository/NavigationData";
import { useTranslation } from "react-i18next";

export default function Navigation() {

    const location = useLocation();
    const { t } = useTranslation()
    
    const activeTabValue = getActiveTabValue(location.pathname);

    return (
        <>
            <Tabs value={activeTabValue} textColor="inherit">
                {navigationData.map((item, index) => (
                    <Tab key={index} label={t(`navigation.${item.label}`)} value={item.value} component={Link} to={item.to}/>
                ))}
            </Tabs>
        </>
    )
}