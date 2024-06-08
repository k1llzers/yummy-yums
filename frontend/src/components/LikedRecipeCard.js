import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/LikedRecipeCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const LikedRecipeCard = ({id, name, ingredients, author, likes, toggleLikes})=>{

    const defaultRecipePhoto = "https://i.pinimg.com/564x/07/7f/d7/077fd782b16b4fb5d96d5fcd74703039.jpg";
    const [photo, setPhoto] = useState(defaultRecipePhoto);

    useEffect(() => {
        fetchPhoto();
    }, []);

    const fetchPhoto = async () => {
        if (!id) return
        await axios.get("http://localhost:8080/api/recipe/get-recipe-image/" + id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setPhoto(URL.createObjectURL(response.data));
        });
    }

    return (
        <Card body className="recipe-card-liked">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="card-container">
                    <div className="recipe-name">
                        <Image className="card-image" src={photo} />
                        <div className="recipe-card-text-info">
                            <Link className="card-title simple-card-link" to={`/recipe/${id}`}>{name}</Link>
                            <p className="recipe-info">
                                <span className="info-title">Інгредієнти: </span>
                                {ingredients ? ingredients.map((item) => item.toLowerCase()).join(', ') : ""}
                            </p>
                            <p className="recipe-info">
                                <span className="info-title">Автор:  </span>
                                {author}
                            </p>
                        </div>
                    </div>
                    <div className="recipe-likes">
                        <span>{likes} </span>
                        <button className="recipe-card-like-button" onClick={()=>{
                            toggleLikes(id);
                        }}><FavoriteIcon fontSize={"large"}/></button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
export default LikedRecipeCard;