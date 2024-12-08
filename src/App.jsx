import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./assets/ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Error from "./assets/ui/Error";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        errorElement: <Error />,
        element: <Login />,
      },

      {
        path: "/dashboard",
        errorElement: <Error />,
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

{
  /* <BrowserRouter>
<Routes>
  <Route element={<AppLayout />} />
  <Route index element={<Navigate replace to="dashboard" />} />
  <Route path="dashboard" element={<Dashboard />} />
</Routes>
</BrowserRouter> */
}
