import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/Contact')({
    component: Contact,
})

export default function Contact() {
    return (
        <div>
            <p>This is the Contact View</p>
        </div>
    )
}