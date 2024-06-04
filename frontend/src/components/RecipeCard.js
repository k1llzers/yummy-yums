import Card from 'react-bootstrap/Card';
import '../styles/RecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useAuth} from "../provider/authProvider";
import {useEffect, useState} from "react";

const RecipeCard = ({title, author, numberOfLikes, ingredients}) => {
    const {role} = useAuth();
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeAuthor, setRecipeAuthor] = useState("");
    const [likes, setLikes] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);

    useEffect(() => {
        setRecipeTitle(title);
        setRecipeAuthor(author);
        setLikes(numberOfLikes);
        setIngredientsList(ingredients);
    }, []);

    return (
        <Card body className="recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="card-container">
                    <div className="recipe-name">
                        <Image className="card-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
                        <div className="recipe-card-text-info">
                            <a className="card-title-a" href='/recipe'><p className="card-title">{recipeTitle}</p></a>
                            <p className="recipe-info">
                            <span className="info-title">Інгредієнти: </span>
                                помідори, огірки, сіль
                            </p>
                            <p className="recipe-info">
                                <span className="info-title">Автор: </span>
                                {recipeAuthor}
                            </p>
                        </div>
                    </div>
                    <div className="recipe-likes">
                        <span>{likes} </span>
                        {role ? <button className="recipe-card-like-button"><FavoriteBorderIcon fontSize="large"/></button> :
                            <button disabled className="recipe-card-like-button"><FavoriteBorderIcon fontSize="large"/></button>}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;