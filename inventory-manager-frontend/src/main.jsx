import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './providers/auth-provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/root'
import ProtectedRoute from './components/protected-route'

import ProductOverview from './pages/products/product-overview'
import Register from './pages/users/authentication/register'

import './index.css'

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <ProductOverview />
          }
        ]
      },
      {
        path: "/auth",
        children: [
          {
            path: "register",
            element: <Register />
          }
        ]
      },
      {
        path: "/errors",
        children: [
          {
            path: "forbidden",
            element: <div>Forbidden</div>
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
