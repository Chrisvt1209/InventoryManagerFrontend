import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/auth-provider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/root.jsx'
import ProtectedRoute from './components/protected-route.jsx'

import ProductOverview from './pages/products/product-overview.jsx'

import Register from './pages/users/authentication/register.jsx'
import Login from './pages/users/authentication/login.jsx'
import Logout from './pages/users/authentication/logout.jsx'

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
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "logout",
            element: <Logout />
          }
        ]
      },
      {
        path: "/errors",
        children: [
          {
            path: "forbidden",
            element: <div className="text-red-500">Forbidden</div>
          }
        ]
      },
      {
        path: "/products",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <ProductOverview />
          },
          {
            path: "create",
            element: <div>Create Product</div>
          },
          {
            path: ":productId",
            children: [
              {
                index: true,
                element: <div>Product Detail</div>
              },
              {
                path: "edit",
                element: <div>Edit Product</div>
              }
            ]
          }
        ]
      },
      {
        path: "/categories",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <div>Category Overview</div>
          },
          {
            path: "create",
            element: <div>Create Category</div>
          },
          {
            path: ":categoryId",
            children: [
              {
                index: true,
                element: <div>Category Detail</div>
              },
              {
                path: "edit",
                element: <div>Edit Category</div>
              }
            ]
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
  </StrictMode>,
)
