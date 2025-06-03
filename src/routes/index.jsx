import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "users", element: <Users /> },
            { path: "products", element: <Products /> },
            { path: "orders", element: <Orders /> },
        ],
    },
]);

export default () => {
    return <RouterProvider router={router} />;
};
