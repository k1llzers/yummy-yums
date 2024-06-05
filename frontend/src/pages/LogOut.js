import {Navigate} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import {useEffect} from "react";

const Logout = () => {
    const { setToken } = useAuth();
    const { setRole } = useAuth();

    const handleLogout = () => {
        setToken();
        setRole();
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return <Navigate to="/"/>;
};

export default Logout;