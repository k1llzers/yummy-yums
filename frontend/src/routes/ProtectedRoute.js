import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const ProtectedRoute = ({ setOpenCreateRecipe }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <NavBar setOpenCreateRecipe={setOpenCreateRecipe} />
            <Outlet />
            <Footer setOpenCreateRecipe={setOpenCreateRecipe} />
        </>
    );
};
