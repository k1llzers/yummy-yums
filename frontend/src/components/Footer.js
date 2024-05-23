
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {ListGroup} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import ContactsIcon from '@mui/icons-material/Contacts';
import NavigationIcon from '@mui/icons-material/Navigation';
import Divider from '@mui/material/Divider';
import '../styles/Footer.css';
const Footer  = () =>{
    return (

            <div className={'main-footer'}
                 style={{backgroundColor: "#E2F0D2"}}>
                <Divider style={{borderTop: "2px solid #3D6827"}} />
                <div className={'container'} style={{margin: '0 31px'}}>
                    <div className={'row'}>

                        <div className={'col-md-4 col-sm-6'} style={{fontSize: "50px", color: "#3D6827"}}>
                            <p className={'logo-footer'} style={{ textAlign: 'left', marginLeft: '2.3vw'}}>Yummy Yums</p>
                        </div>

                        <div className={'col-md-4 col-sm-6'}>
                            <h4 className={'subtitle'}><NavigationIcon></NavigationIcon>Навігація</h4>
                            <Nav className="me-auto" style={{justifyContent:'center'}}>
                                <ul className={'list-unstyled'} style={{textAlign:'left'}}>
                                    <li>
                                        <Nav.Link href="#home" style={{fontSize: "20px", fontFamily: "Forum", color: "#3D6827"}}>Рецепти</Nav.Link>
                                    </li>
                                    <li>
                                        <Nav.Link href="#features" style={{fontSize: "20px", fontFamily: "Forum",  color: "#3D6827"}}>Мій профіль</Nav.Link>
                                    </li>
                                    <li>
                                        <Nav.Link href="#pricing" style={{fontSize: "20px", fontFamily: "Forum", color: "#3D6827"}}>Створити рецепт</Nav.Link>
                                    </li>
                                </ul>
                            </Nav>
                        </div>
                        <div className={'col-md-4 col-sm-6'}>
                            <h4 className={'subtitle'}><ContactsIcon></ContactsIcon> Розробники</h4>
                            <ButtonGroup vertical>
                                <DropdownButton
                                    as={ListGroup}
                                    title="Семицький О.І."
                                    id="bg-vertical-dropdown-1"
                                    style={{backgroundColor:'#E2F0D2'}}
                                    className={'dropdown-button-custom'}
                                >
                                    <Dropdown.Item eventKey="1">(096) 718-39-45</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">o.semytskyi@ukma.edu.ua</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton
                                    as={ListGroup}
                                    title="Ветрикуш Д.А."
                                    id="bg-vertical-dropdown-2"
                                    className={'dropdown-button-custom'}
                                >
                                    <Dropdown.Item eventKey="1">(067) 354-04-04</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">d.vetrykush@ukma.edu.ua</Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton
                                    as={ListGroup}
                                    title="Качинська І.В."
                                    id="bg-vertical-dropdown-3"
                                    className={'dropdown-button-custom'}
                                >
                                    <Dropdown.Item eventKey="1">(068) 444-36-28</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">i.kachynska@ukma.edu.ua</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className={'footer-bottom'}>
                        <p className={'text-xs-left'} style={{fontFamily: "Forum", color: "#3D6827", textAlign:'left', marginBottom:0}}>
                            &copy;{new Date().getFullYear()} Yummy Yums - All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>

    )
}

export default Footer