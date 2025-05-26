import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/OurLocation')({
    component: OurLocation,
})

export default function OurLocation() {
    return (
        <div>
            <p>This is the OurLocation View</p>
        </div>
    )
}