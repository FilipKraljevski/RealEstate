import '../../App.css'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient, router } from '../../common/Routing/RoutesConfig'
import { QueryClientProvider } from '@tanstack/react-query'

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
