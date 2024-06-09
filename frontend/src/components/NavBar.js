import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from "../provider/authProvider";
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import Image from "react-bootstrap/Image";
import {useEffect, useState} from "react";

const NavBar = ({setOpenCreateRecipe, setOpenUpdateCategories}) => {
    const {role} = useAuth();
    const [coords, setCoords] = useState({latitude: 0, longitude: 0})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords(position.coords);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );

    }, []);

    const handleLinkClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#E2F0D2"}}>
            <Container>
                <Navbar.Brand className="logo" style={{fontSize: "50px", color: "#3D6827"}} href="/">Yummy
                    Yums</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" style={{marginLeft: "15px", alignItems: "center"}}>
                        <Nav.Link href="/all-recipes" style={{
                            fontSize: "25px",
                            margin: "0 20px",
                            fontFamily: "Gentium Plus",
                            color: "#3D6827"
                        }}>Рецепти</Nav.Link>
                        {role && <Nav.Link href={role === 'USER' ? "/account" : "/manager"} style={{
                            fontSize: "25px",
                            margin: "0 20px",
                            fontFamily: "Gentium Plus",
                            color: "#3D6827"
                        }}>Мій профіль</Nav.Link>}
                        {role && <Nav.Link
                            onClick={() => {
                                role === 'USER' ? setOpenCreateRecipe(true) : setOpenUpdateCategories(true)
                            }}
                            style={{fontSize: "25px", margin: "0 20px", fontFamily: "Gentium Plus", color: "#3D6827"}}>
                            {role === 'USER' ? "Створити рецепт" : "Редагувати категорії"}
                        </Nav.Link>}
                        {role === 'USER' && <Nav.Link id={"locations"} style={{
                            fontSize: "25px",
                            margin: "0 20px",
                            fontFamily: "Gentium Plus",
                            color: "#3D6827"
                        }}>
                            <Accordion style={{
                                fontSize: "25px",
                                fontFamily: "Gentium Plus",
                                color: "#3D6827",
                                backgroundColor: "rgb(226, 240, 210)",
                                boxShadow: "none",
                                textAlign: "center"
                            }}
                            >
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Магазини поблизу
                                </AccordionSummary>
                                <AccordionDetails style={{fontSize: "22px", textAlign: "center"}}>
                                    <div className={'all-store-locations'}>
                                        <a href={`https://www.google.com.ua/maps/search/NOVUS/@${coords.latitude},${coords.longitude},15z`}
                                           target={"_blank"} rel="noopener noreferrer" onClick={handleLinkClick}
                                        >
                                            <div className={"one-store-location"}>
                                                <Image
                                                    src={'https://upload.wikimedia.org/wikipedia/uk/thumb/f/ff/Novus_Ukraina_logo.svg/1200px-Novus_Ukraina_logo.svg.png'}
                                                    className={'shop-image'}>
                                                </Image>
                                            </div>
                                        </a>
                                        <a href={`https://www.google.com.ua/maps/search/%D0%90%D0%A2%D0%91/@${coords.latitude},${coords.longitude},15z`}
                                           target={"_blank"} rel="noopener noreferrer" onClick={handleLinkClick}
                                        >
                                            <div className={"one-store-location"}>
                                                <Image
                                                    src={'https://cdn.picodi.com/ua/files/shop-description/a/atbmarket/atb-logo.png?v=6656'}
                                                    className={'shop-image'}>
                                                </Image>
                                            </div>
                                        </a>
                                        <a href={`https://www.google.com.ua/maps/search/Silpo/@${coords.latitude},${coords.longitude},15z`}
                                           target={"_blank"} rel="noopener noreferrer" onClick={handleLinkClick}
                                        >
                                            <div className={"one-store-location"}>
                                                <Image
                                                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silpo_outline_logo.svg/2560px-Silpo_outline_logo.svg.png'}
                                                    className={'shop-image'}>
                                                </Image>
                                            </div>
                                        </a>
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