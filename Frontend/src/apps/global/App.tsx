import '../../App.css'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient, router } from '../../common/Routing/RoutesConfig'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../../common/Context/AuthProvider'
import { NotificationProvider } from '../../common/Context/NotificationProvider'

function App() {

  return (
    <>
    <AuthProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </NotificationProvider>
    </AuthProvider>
    </>
  )
}

export default App
