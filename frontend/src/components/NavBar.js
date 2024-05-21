import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css';


const NavBar = () => {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Yummy Yums</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Рецепти</Nav.Link>
                    <Nav.Link href="#features">Мій профіль</Nav.Link>
                    <Nav.Link href="#pricing">Створити рецепт</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;