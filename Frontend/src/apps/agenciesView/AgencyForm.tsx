import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute('/AgencyForm')({
    component: AgencyForm,
})

export default function AgencyForm() {
    
}