import NavBar from "../components/NavBar";
import '../styles/HomePage.css';
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <>
            <div className="main-container">
                <NavBar/>
                <div className="inner-container">
                    <p className="home-logo">Yummy Yums</p>
                    <p className="home-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius arcu felis, sodales accumsan neque aliquam quis.
                    </p>
                    <div className="home-buttons-container">
                        <button className="home-button">
                            Увійти
                        </button>
                        <button className="home-button">
                            Зареєструватись
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default HomePage;