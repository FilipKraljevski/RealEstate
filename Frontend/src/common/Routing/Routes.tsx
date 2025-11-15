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

export const realEstateDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'RealEstateDetails/$id',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/realEstateView/RealEstateDetails').then((d) => d.Route))

export const yourEstatesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'YourEstates',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/realEstateView/YourEstates').then((d) => d.Route))

// Route without id
export const estateFormNewRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'EstateForm',
    loader: () => console.log("fetchApi without id"),
}).lazy(() =>
    import('../../apps/realEstateView/YourEstateForm').then((d) => d.Route1)
);

export const estateFormRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'EstateForm/$id?',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/realEstateView/YourEstateForm').then((d) => d.Route))

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

export const agenciesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'Agencies',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/agenciesView/Agencies').then((d) => d.Route))

export const agencyDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AgencyDetails/$id',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/agenciesView/AgencyDetails').then((d) => d.Route))

export const agencyFormNewRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AgencyForm',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/agenciesView/AgencyForm').then((d) => d.Route1))

export const agencyFormRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/AgencyForm/$id?',
    //errorComponent: ErrorComponent, 
    loader: () => console.log("fecthApi"),
}).lazy(() => import('../../apps/agenciesView/AgencyForm').then((d) => d.Route))

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
    realEstateDetailsRoute,
    yourEstatesRoute,
    estateFormNewRoute,
    estateFormRoute,
    yourOfferRoute,
    lookingPropertyRoute,
    agenciesRoute,
    agencyDetailsRoute,
    agencyFormNewRoute,
    agencyFormRoute,
    contactRoute,
])