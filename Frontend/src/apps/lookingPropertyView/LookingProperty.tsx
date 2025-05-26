import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/LookingProperty')({
    component: LookingProperty,
})

export default function LookingProperty() {
    return (
        <div>
            <p>This is the LookingForProperty View</p>
        </div>
    )
}