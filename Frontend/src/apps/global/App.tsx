import '../../App.css'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient, router } from '../../common/Routing/RoutesConfig'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../../common/Context/AuthProvider'

function App() {

  return (
    <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    </>
  )
}

export default App
