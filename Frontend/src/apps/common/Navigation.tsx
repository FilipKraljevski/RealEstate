import { Tabs, Tab } from "@mui/material";
import { Link } from "@tanstack/react-router";
import React from "react";

export default function Navigation() {

    const [value, setValue] = React.useState('1');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    
    return (
        <>
            <Tabs onChange={handleChange} value={value} textColor="inherit">
                <Tab label="Дома" value="1" component={Link} to="/"/>
                <Tab label="За нас" value="2" component={Link} to="/AboutUs" />
                <Tab label="Недвижнини" value="3" component={Link} to="/RealEstate" />
                <Tab label="Ваша понуда" value="4" component={Link} to="/YourOffer"/>
                <Tab label="Барате имот" value="5" component={Link} to="/LookingProperty"/>
                <Tab label="Локација" value="6" component={Link} to="/OurLocation"/>
                <Tab label="Контакт" value="7" component={Link} to="/Contact"/>
            </Tabs>
        </>
    )
}