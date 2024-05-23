import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/AccountPage.css';
import {Select, MenuItem} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SimpleRecipeCard from "../components/SimpleRecipeCard";
import LikedRecipeCard from "../components/LikedRecipeCard";

const AccountPage = () => {
    return (
        <div className={'main-container'}>
            <NavBar/>
            <div className={"top-container"}>
                <div className={'personal-info-container'}>
                    <Card body className="account-card">
                        <Card.Body style={{padding: "0px 5px"}}>
                            <div className="card-container">
                                <div className="account-name">
                                    <Image className="card-image"
                                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouz4bFZt20u2XHT4zM-7vP4OV_lZ1nT0JlQ&s"/>
                                    <div className="account-card-text-info">
                                        <p className="account-title">Григорій Сковорода </p>
                                        <p className="account-info">
                                            h.skovoroda@ukma.edu.ua
                                        </p>
                                        <p className="account-info">
                                            Kyiv, Ukraine
                                        </p>
                                        <div className={'with-icon'}>
                                            <p className="account-info">
                                                <DescriptionIcon style={{height: '30px'}}/> 37 рецептів
                                            </p>
                                            <p className="account-info info-likes"><FavoriteBorderIcon
                                                style={{height: '30px'}}/> 468 лайків</p>
                                        </div>
                                        <div className="recipe-likes">
                                            <button className={'edit-button'}>Редагувати профіль</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className={'family-info-container'}>

                    <Select placeholder={'Моя сімʼя'}
                    >
                        <MenuItem value={1}>Я (1)</MenuItem>
                        <MenuItem value={2}>Мама і Тато (2)</MenuItem>
                        <MenuItem value={3}>Сімʼя з трьох (3)</MenuItem>
                        <MenuItem value={4}>Сімʼя з чотирьох (4)</MenuItem>
                        <MenuItem value={5}>Сімʼя з п'яти (5)</MenuItem>
                        <MenuItem value={10}>Велика родина (10)</MenuItem>
                    </Select>
                </div>
            </div>
            <div className={'bottom-container'}>
                <Tabs
                    id="controlled-tab-example"

                >
                    <Tab eventKey="recepts" title="Мої рецепти">
                        <div className={'own-recipes-container'}>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                            <SimpleRecipeCard/>
                        </div>

                    </Tab>
                    <Tab eventKey="likes-recipes" title="Вподобані">
                        <div className={'liked-recipe-card'}>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                            <LikedRecipeCard/>
                        </div>
                    </Tab>
                    <Tab eventKey="product-list" title="Список продуктів">
                        Tab content for Contact
                    </Tab>
                    <Tab eventKey="friend-requests" title="Запити">
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </div>
            <Footer/>
        </div>

    )
        ;
}
export default AccountPage;