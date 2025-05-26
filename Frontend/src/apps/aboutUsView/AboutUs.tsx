import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/AboutUs')({
    component: AboutUs,
})

function AboutUs() {

    return (
        <div>
            <p>This is the AboutUs View</p>
        </div>
    )
}