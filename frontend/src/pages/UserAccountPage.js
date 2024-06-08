import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/AccountPage.css';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SimpleRecipeCard from "../components/SimpleRecipeCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


const UserAccountPage = () => {
    const [weather, setWeather] = useState({
        location: {
            name: "Kyiv",
            country: "Ukraine"
        }
    });
    const [userRecipes, setUserRecipes] = useState([]);
    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountLikesCount, setAccountLikesCount] = useState(0);
    const [accountRecipesCount, setAccountRecipesCount] = useState(0);
    const id = useParams();

    const fetchUserInfo = async () => {
        const response = await axios.get("http://localhost:8080/api/user/" + id.id);
        if (response) {
            setAccountName(response.data.surname + " " + response.data.name);
            setAccountEmail(response.data.email);
            setAccountLikesCount(response.data.countOfLikesOnMyRecipes);
            setAccountRecipesCount(response.data.countOfRecipes);
        } else {
            console.log("Error fetching personal info");
        }
    }

    const fetchUserRecipes = async () => {
        const response = await axios.get("http://localhost:8080/api/recipe/get-by-user/" + id.id);
        if (response) {
            setUserRecipes(response.data);
        } else {
            setUserRecipes([]);
        }
    }

    useEffect(() => {
        fetchUserInfo();
        fetchUserRecipes();
    }, []);



    return (
        <div className={'main-container'}>
            <div className={"top-container"} style={{justifyContent: 'start'}}>
                <div className={'personal-info-container'}>
                    <Card body className="account-card" id={'account-card'}>
                        <Card.Body style={{padding: "0px 30px"}}>
                            <div className="card-container">
                                <div className="account-name">
                                    <Image className="account-card-image"
                                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouz4bFZt20u2XHT4zM-7vP4OV_lZ1nT0JlQ&s"/>
                                    <div className="account-card-text-info">
                                        <p className="account-title">{accountName}</p>
                                        <p className="account-info">
                                            {accountEmail}
                                        </p>
                                        <p className="account-info">
                                            {weather.location.name}, {weather.location.country}
                                        </p>
                                        <div className={'with-icon'}>
                                            <p className="account-info">
                                                <DescriptionIcon
                                                    style={{height: '30px'}}/> {accountRecipesCount} рецептів
                                            </p>
                                            <p className="account-info info-likes"><FavoriteBorderIcon
                                                style={{height: '30px'}}/> {accountLikesCount} лайків</p>
                                        </div>
                                        {/*<div className="recipe-likes"></div>*/}
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className={'bottom-container'}>
                <Tabs
                    id="controlled-tab-example"
                >
                    <Tab eventKey="recepts" style={{fontSize: "2.5rem"}} title="Рецепти">
                        <div className={'own-recipes-container'}>
                            {userRecipes.map((recipe) => (
                                <SimpleRecipeCard
                                    key={recipe.id}
                                    id={recipe.id}
                                    title={recipe.name}
                                    likes={recipe.countOfLikes}
                                    comments={recipe.countOfComments}
                                    isLiked={recipe.iliked}
                                />
                            ))}
                        </div>

                    </Tab>
                </Tabs>
            </div>
        </div>

    )
        ;
}
export default UserAccountPage;