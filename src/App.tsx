import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import DoctorDetails from "./pages/DoctorDetails"
import Layout from "./components/layout/Layout"

function App() {
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/doctor/:id",
        element: <DoctorDetails />,
      },
    ],
  },
])

  return (
    <>
     <RouterProvider router={routes} />
    </>
  )
}

export default App
