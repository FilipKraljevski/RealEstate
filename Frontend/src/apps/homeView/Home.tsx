import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/')({
    component: Home,
})

export default function Home() {
    return (
        <div>
            <p>This is the Home View</p>
        </div>
    )
}