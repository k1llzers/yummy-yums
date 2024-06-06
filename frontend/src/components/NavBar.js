import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from "../provider/authProvider";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Image from "react-bootstrap/Image";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
function ExpandMoreIcon() {
    return null;
}

const NavBar = ({setOpenCreateRecipe}) => {
    const {role} = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#E2F0D2"}}>
            <Container>
                <Navbar.Brand className="logo" style={{fontSize: "50px", color: "#3D6827"}} href="/">Yummy Yums</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{marginLeft: "15px", alignItems:"center"}}>
                        <Nav.Link href="/all-recipes" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus", color: "#3D6827"}}>Рецепти</Nav.Link>
                        {role && <Nav.Link href="/account" style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus",  color: "#3D6827"}}>Мій профіль</Nav.Link>}
                        {role && <Nav.Link onClick={() => setOpenCreateRecipe(true)} style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus", color: "#3D6827"}}>Створити рецепт</Nav.Link>}
                        {role && <Nav.Link id={"locations"} style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus", color: "#3D6827"}}>
                            <Accordion style={{fontSize: "25px",fontFamily: "Gentium Plus",  color: "#3D6827", backgroundColor: "rgb(226, 240, 210)", boxShadow:"none", textAlign:"center"}}>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Магазини поблизу
                                </AccordionSummary>
                                <AccordionDetails  style={{fontSize: "22px", textAlign:"center"}}>
                                    <div className={'all-store-locations'}>
                                        <div className={"one-store-location"}>
                                            <Image
                                                src={'https://upload.wikimedia.org/wikipedia/uk/thumb/f/ff/Novus_Ukraina_logo.svg/1200px-Novus_Ukraina_logo.svg.png'}
                                                className={'shop-image'}>
                                            </Image>
                                            <div><LocationOnOutlinedIcon/>Єбейша локація</div>
                                        </div>
                                        <div className={"one-store-location"}>
                                            <Image
                                                src={'https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656'}
                                                className={'shop-image'}>
                                            </Image>
                                            <div><LocationOnOutlinedIcon/>Не менш єбейша локація</div>
                                        </div>
                                        <div className={"one-store-location"}>
                                            <Image
                                                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silpo_outline_logo.svg/2560px-Silpo_outline_logo.svg.png'}
                                                className={'shop-image'}>
                                            </Image>
                                            <div><LocationOnOutlinedIcon/>Дуже крута і єбейша локація</div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Nav.Link>}
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