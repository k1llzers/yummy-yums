import NavBar from "../components/NavBar";
import Button from 'react-bootstrap/Button';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="main-container">
            <NavBar/>
            <div className="inner-container">
                <p className="home-logo">Yummy Yums</p>
                <p className="home-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius arcu felis, sodales accumsan neque aliquam quis.
                </p>
                <div className="home-buttons-container">
                    <button className="home-button">
                        Log In
                    </button>
                    <button className="home-button">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;