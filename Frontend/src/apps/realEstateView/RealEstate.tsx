import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/RealEstate')({
    component: RealEstate,
})

export default function RealEstate() {
    return (
        <div>
            <p>This is the RealEstate View</p>
        </div>
    )
}