import '../../App.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '../../common/Routing/RoutesConfig'

function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
