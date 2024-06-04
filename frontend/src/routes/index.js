import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import AllRecipesPage from "../pages/AllRecipesPage";
import RecipePage from "../pages/RecipePage";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import CreateRecipeForm from "../components/CreateRecipeForm";

const AppLayout = ({ setOpenCreateRecipe }) => (
    <>
        <NavBar setOpenCreateRecipe={setOpenCreateRecipe} />
        <Outlet />
        <Footer setOpenCreateRecipe={setOpenCreateRecipe} />
    </>
);

const Routes = () => {
    const { token, role } = useAuth();
    const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute setOpenCreateRecipe={setOpenCreateRecipe} />,
            children: [
                {
                    path: "/account",
                    element: <AccountPage />,
                }
                // {
                //     path: "/logout",
                //     element: <Logout />,
                // }
            ]
        }
    ];

    const routesForAllUsers = [
        {
            path: "/",
            element: <AppLayout setOpenCreateRecipe={setOpenCreateRecipe} />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/all-recipes",
                    element: <AllRecipesPage />,
                },
                {
                    path: "/recipe/:id",
                    element: <RecipePage />,
                },
            ]
        },
    ];

    const router = createBrowserRouter([
        ...routesForAllUsers,
        ...(token ? routesForAuthenticatedOnly : [])
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <CreateRecipeForm open={openCreateRecipe} setOpen={setOpenCreateRecipe} />
        </>
    );
};

export default Routes;
