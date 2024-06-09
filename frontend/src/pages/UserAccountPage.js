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
import {useAuth} from "../provider/authProvider";


const UserAccountPage = () => {
    const defaultPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";

    const userId = useParams();
    const [userRecipes, setUserRecipes] = useState([]);
    const [accountName, setAccountName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountLikesCount, setAccountLikesCount] = useState(0);
    const [accountRecipesCount, setAccountRecipesCount] = useState(0);
    const [accountPhoto, setAccountPhoto] = useState(defaultPhoto);

    const fetchUserInfo = async () => {
        const response = await axios.get("http://localhost:8080/api/user/" + userId.id);
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
        const response = await axios.get("http://localhost:8080/api/recipe/get-by-user/" + userId.id);
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

    useEffect(() => {
        fetchPhoto();
    }, [userId]);


    const fetchPhoto = async () => {
        if (!userId) return
        await axios.get("http://localhost:8080/api/user/get-user-image/" + userId.id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setAccountPhoto(URL.createObjectURL(response.data));
        });
    }

    return (
        <div className={'main-container'}>
            <div className={"top-container"} style={{justifyContent: 'start'}}>
                <div className={'personal-info-container'}>
                    <Card body className="account-card" id={'account-card'}>
                        <Card.Body style={{padding: "0px 30px"}}>
                            <div className="card-container">
                                <div className="account-name">
                                    <Image className="account-card-image"
                                           src={accountPhoto}/>
                                    <div className="account-card-text-info">
                                        <p className="account-title">{accountName}</p>
                                        <p className="account-info">
                                            {accountEmail}
                                        </p>
                                        <div className={'with-icon'}>
                                            <p className="account-info">
                                                <DescriptionIcon
                                                    style={{height: '30px'}}/> {accountRecipesCount} рецептів
                                            </p>
                                            <p className="account-info info-likes"><FavoriteBorderIcon
                                                style={{height: '30px'}}/> {accountLikesCount} лайків</p>
                                        </div>
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
                                    showStatus={false}
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