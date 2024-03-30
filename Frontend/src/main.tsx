import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.tsx'
import Signin from './pages/Signin.tsx'
import BlogLayout from './pages/BlogLayout.tsx'
import CreateBlog from './pages/CreateBlog.tsx'
import FullBlog from './pages/FullBlog.tsx'
import AllBlogs from './pages/AllBlogs.tsx'


const router = createBrowserRouter([
  {
    path: '',
    element: <App />,

    children: [
      {
        path: '',
        element: <Navigate to={"/blogs"} />
      },
      {
        path: 'signin',
        element: <Signin />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'blogs',
        element: <BlogLayout />,
        children: [
          {
            path: '',
            element: <AllBlogs />
          },

        ]
      },
      {
        path: 'blog/:id',
        element: <FullBlog />
      },
      {
        path: 'write',
        element: <CreateBlog />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
