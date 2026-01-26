import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import ProfessionalDetails from "./pages/ProfessionalDetails"
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
        path: "/professional/:id",
        element: <ProfessionalDetails />,
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
