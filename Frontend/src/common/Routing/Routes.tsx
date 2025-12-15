import { createRootRouteWithContext, createRoute, Link, Navigate } from "@tanstack/react-router";
import Layout from "../../apps/common/Layout";
import { QueryClient } from '@tanstack/react-query'
import { agenciesQueryOptions, agencyDetailsQueryOptions, estateDetailsQueryOptions } from "./RouteQueries";
import { useAuth } from "../Context/AuthProvider";
import { hasFlag } from "../Logic/EnumHelper";

const rootRoute = createRootRouteWithContext<{queryClient: QueryClient}>()({
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

export function Protected({ children, authorizedRoles }: { children: React.ReactNode, authorizedRoles?: number }) {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to="/Login" />;
    }
    if(authorizedRoles && !hasFlag(user?.roles ?? 0, authorizedRoles)){
        return <Navigate to="/" />;
    }
    return <>{children}</>;
  }

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
}).lazy(() => import('../../apps/homeView/Home').then((d) => d.Route))

const aboutUsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AboutUs',
}).lazy(() => import('../../apps/aboutUsView/AboutUs').then((d) => d.Route))

export const realEstateRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'RealEstate',
}).lazy(() => import('../../apps/realEstateView/RealEstate').then((d) => d.Route))

export const realEstateDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'RealEstateDetails/$id',
    loader: ({ context: { queryClient }, params: { id } }) =>
        queryClient.ensureQueryData(estateDetailsQueryOptions(id)),
}).lazy(() => import('../../apps/realEstateView/RealEstateDetails').then((d) => d.Route))

export const yourEstatesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'YourEstates'
}).lazy(() => import('../../apps/realEstateView/YourEstates').then((d) => d.Route))

export const estateFormNewRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'EstateForm'
}).lazy(() => import('../../apps/realEstateView/YourEstateForm').then((d) => d.Route1));

export const estateFormRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'EstateForm/$id',
}).lazy(() => import('../../apps/realEstateView/YourEstateForm').then((d) => d.Route))

export const yourOfferRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'YourOffer',
}).lazy(() => import('../../apps/yourOfferView/YourOffer').then((d) => d.Route))

export const lookingPropertyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'LookingProperty'
}).lazy(() => import('../../apps/lookingPropertyView/LookingProperty').then((d) => d.Route))

export const agenciesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'Agencies',
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(agenciesQueryOptions()),
}).lazy(() => import('../../apps/agenciesView/Agencies').then((d) => d.Route))

export const agencyDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AgencyDetails/$id',
    loader: ({ context: { queryClient }, params: { id } }) =>
        queryClient.ensureQueryData(agencyDetailsQueryOptions(id)),
}).lazy(() => import('../../apps/agenciesView/AgencyDetails').then((d) => d.Route))

export const agencyFormNewRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AgencyForm'
}).lazy(() => import('../../apps/agenciesView/AgencyForm').then((d) => d.Route1))

export const agencyFormRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'AgencyForm/$id',
}).lazy(() => import('../../apps/agenciesView/AgencyForm').then((d) => d.Route))

export const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'Contact',
}).lazy(() => import('../../apps/contactView/Contact').then((d) => d.Route))

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'Login',
}).lazy(() => import('../../apps/login/Login').then((d) => d.Route))

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
    loginRoute
])