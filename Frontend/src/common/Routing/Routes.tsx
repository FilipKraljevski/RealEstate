import { createRootRoute, createRoute, Link } from "@tanstack/react-router";
import Layout from "../../apps/common/Layout";

const rootRoute = createRootRoute({
    component: Layout,
    notFoundComponent: () => {
        return (
          <div>
            <p>This is the notFoundComponent configured on root route</p>
            <Link to="/">Start Over</Link>
          </div>
        )
    }
})

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    //errorComponent: ErrorComponent, 
    loader:() => console.log("fecthApi")
}).lazy(() => import('../../apps/homeView/Home').then((d) => d.Route))

const aboutUsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AboutUs',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/aboutUsView/AboutUs').then((d) => d.Route))

export const realEstateRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'RealEstate',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/realEstateView/RealEstate').then((d) => d.Route))

export const yourOfferRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'YourOffer',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/yourOfferView/YourOffer').then((d) => d.Route))

export const lookingPropertyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'LookingProperty',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/lookingPropertyView/LookingProperty').then((d) => d.Route))

export const ourLocationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'OurLocation',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/ourLocationView/OurLocation').then((d) => d.Route))

export const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'Contact',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/contactView/Contact').then((d) => d.Route))

export const routeTree = rootRoute.addChildren([
    homeRoute,
    aboutUsRoute,
    realEstateRoute,
    yourOfferRoute,
    lookingPropertyRoute,
    ourLocationRoute,
    contactRoute,
])