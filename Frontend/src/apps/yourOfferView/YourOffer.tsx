import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/YourOffer')({
    component: YourOffer,
})

export default function YourOffer() {
    return (
        <div>
            <p>This is the YourOffer View</p>
        </div>
    )
}