import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import NavBar from "../components/NavBar";
import {useState} from "react";
import CreateRecipeForm from "../components/CreateRecipeForm";

export const ProtectedRoute = () => {
    const {token} = useAuth();
    const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
    if(!token) {
        return <Navigate to = "/" />
    }

    return (
        <>
            <NavBar setOpenCreateRecipe={setOpenCreateRecipe}/>
            <CreateRecipeForm open={openCreateRecipe} setOpen={setOpenCreateRecipe}/>
            <Outlet/>
        </>
    )
}