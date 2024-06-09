import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const ProtectedRoute = ({ setOpenCreateRecipe, setOpenUpdateCategories }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <NavBar setOpenCreateRecipe={setOpenCreateRecipe} setOpenUpdateCategories={setOpenUpdateCategories}/>
            <Outlet />
            <Footer setOpenCreateRecipe={setOpenCreateRecipe} setOpenUpdateCategories={setOpenUpdateCategories}/>
        </>
    );
};
