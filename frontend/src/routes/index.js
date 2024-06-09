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
import LogOut from "../pages/LogOut";
import { useParams } from "react-router-dom";
import UserAccountPage from "../pages/UserAccountPage";
import ErrorPage from "../pages/ErrorPage";
import ManagerAccountPage from "../pages/ManagerAccountPage";
import EditCategoriesPopup from "../components/EditCategoriesPopup";

const AppLayout = ({ setOpenCreateRecipe, setOpenUpdateCategories }) => (
    <>
        <NavBar setOpenCreateRecipe={setOpenCreateRecipe} setOpenUpdateCategories={setOpenUpdateCategories}/>
        <Outlet />
        <Footer setOpenCreateRecipe={setOpenCreateRecipe} setOpenUpdateCategories={setOpenUpdateCategories}/>
    </>
);

const Routes = () => {
    const { token, role, id } = useAuth();
    const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
    const [openUpdateCategories, setOpenUpdateCategories] = useState(false);

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute setOpenCreateRecipe={setOpenCreateRecipe} setOpenUpdateCategories={setOpenUpdateCategories}/>,
            children: [
                {
                    path: "/account",
                    element: <AccountPage />,
                },
                {
                    path: "/manager",
                    element: <ManagerAccountPage/>
                },
                {
                    path: "/logout",
                    element: <LogOut />,
                }
            ]
        }
    ];

    const routesForAllUsers = [
        {
            path: "/",
            element: <AppLayout setOpenCreateRecipe={setOpenCreateRecipe} setOpenUpdateCategories={setOpenUpdateCategories} />,
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
                {
                    path: "/user/:id",
                    element: <UserAccountPage/>
                }
            ]
        },
    ];

    const routes404 = [
        {
            path: "*",
            element: <ErrorPage/>
        }
    ]

    const router = createBrowserRouter([
        ...routesForAllUsers,
        ...(token ? routesForAuthenticatedOnly : []),
        ...routes404
    ]);


    return (
        <>
            <RouterProvider router={router} />
            <CreateRecipeForm open={openCreateRecipe} setOpen={setOpenCreateRecipe} />
            <EditCategoriesPopup open={openUpdateCategories} setOpen={setOpenUpdateCategories}/>
        </>
    );
};

export default Routes;
