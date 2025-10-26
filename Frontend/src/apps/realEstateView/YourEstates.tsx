import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute('/YourEstates')({
    component: YourEstates,
})

export default function YourEstates(){

}