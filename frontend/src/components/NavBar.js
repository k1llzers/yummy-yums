import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#E2F0D2"}}>
            <Container>
                <Navbar.Brand className="logo" style={{fontSize: "50px", color: "#3D6827"}} href="#home">Yummy Yums</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{marginLeft: "15px"}}>
                        <Nav.Link href="#home" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Forum", color: "#3D6827"}}>Рецепти</Nav.Link>
                        <Nav.Link href="#features" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Forum",  color: "#3D6827"}}>Мій профіль</Nav.Link>
                        <Nav.Link href="#pricing" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Forum", color: "#3D6827"}}>Створити рецепт</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;