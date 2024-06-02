import {RouterProvider, createBrowserRouter} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import AllRecipesPage from "../pages/AllRecipesPage";
import RecipePage from "../pages/RecipePage";
import Logout from "../pages/Logout";


const Routes = () => {
    const {token, role} = useAuth()

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute/>,
            children : [
                {
                    path: "/",
                    element: <HomePage/>,
                },
                {
                    path: "/account",
                    element: <AccountPage/>,
                },
                {
                    path: "/all-recipes",
                    element: <AllRecipesPage/>,
                },
                {
                    path: "/recipe",
                    element: <RecipePage/>,
                },
                {
                    path: "/logout",
                    element: <Logout/>,
                }
            ]
        }
    ]

    // const routesForManagerOnly = [
    //     {
    //         path: "/",
    //         element: <ProtectedRoute/>,
    //         children : [
    //             {
    //                 path: "/categories",
    //                 element: <Categories/>,
    //             },
    //             {
    //                 path: "/employees",
    //                 element: <Employees/>,
    //             }
    //         ]
    //     }
    // ]
    //
    // const routesForNotAuthenticatedOnly = [
    //     {
    //         path: "/login",
    //         element: <Login/>
    //     }
    // ]
    //
    // const routes404 = [
    //     {
    //         path: "*",
    //         element: <NotFound/>
    //     }
    // ]

    const router = createBrowserRouter([
        // ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
        // ...(role === "MANAGER" ? routesForManagerOnly : []),
        // ...routes404
    ])

    return <RouterProvider router={router} />
}

export default Routes;