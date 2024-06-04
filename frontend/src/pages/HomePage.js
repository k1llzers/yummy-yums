import NavBar from "../components/NavBar";
import '../styles/HomePage.css';
import Footer from "../components/Footer";
import LogInForm from "./LogInForm";
import {useState} from "react";
import SignUpForm from "./SignUpForm";
import {useAuth} from "../provider/authProvider";

const HomePage = () => {
    const {role} = useAuth();

    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openSignupForm, setOpenSignupForm] = useState(false);

    return (
        <>
            <div className="home-main-container">
                <LogInForm openLogin={openLoginForm} setOpenLogin={setOpenLoginForm}/>
                <SignUpForm open={openSignupForm} setOpen={setOpenSignupForm}/>
                <div className="home-inner-container">
                    <p className="home-logo">Yummy Yums</p>
                    <p className="home-description">
                        Yummy Yums - це не просто інструкції для готування, це справжня кулінарна спільнота, де люди
                        можуть ділитися своїми улюбленими стравами та кулінарними враженнями.
                    </p>
                    {!role && <div className="home-buttons-container">
                        <button className="home-button" onClick={() => setOpenLoginForm(true)}>
                            Увійти
                        </button>
                        <button className="home-button" onClick={() => setOpenSignupForm(true)}>
                            Зареєструватись
                        </button>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default HomePage;