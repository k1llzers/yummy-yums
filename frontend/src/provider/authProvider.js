import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext();

const AuthProvider =  ({children}) => {
    const [token, setToken_] = useState(localStorage.getItem("token"))
    const [role, setRole_] = useState(localStorage.getItem("role"))
    const [id, setId_] = useState(localStorage.getItem("id"))

    const setToken = (newToken) => {
        setToken_(newToken)
    }

    const setRole = (role) => {
        setRole_(role)
    }

    const setId = (id) => {
        setId_(id)
    }

    useEffect(() => {
        if(token) {
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
            localStorage.setItem("id", id);
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("id")
        }
    }, [token])

    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token")
        if (token && !config.skipAuth)
            config.headers.Authorization = 'Bearer ' + token;
        return config;
    });

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            window.location.href = "/logout"
        }
    });

    const contextValue = useMemo(
        () => ({
            token,
            role,
            id,
            setToken,
            setRole,
            setId
        }),
        [token, role, id]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;
