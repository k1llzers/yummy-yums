import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from "../provider/authProvider";
import {useEffect} from "react";

const NavBar = ({setOpenCreateRecipe}) => {
    const {role} = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#E2F0D2"}}>
            <Container>
                <Navbar.Brand className="logo" style={{fontSize: "50px", color: "#3D6827"}} href="/">Yummy Yums</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{marginLeft: "15px"}}>
                        <Nav.Link href="/all-recipes" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus", color: "#3D6827"}}>Рецепти</Nav.Link>
                        {role && <Nav.Link href="/account" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus",  color: "#3D6827"}}>Мій профіль</Nav.Link>}
                        {role && <Nav.Link onClick={() => setOpenCreateRecipe(true)} style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus", color: "#3D6827"}}>Створити рецепт</Nav.Link>}
                    </Nav>
                    <Nav>
                        {role && <Nav.Link href="/logout">
                            <LogoutIcon fontSize='medium' sx={{color: "#3D6827"}}/>
                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;