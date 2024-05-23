import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/LikedRecipeCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikedRecipeCard = ()=>{
    return (
        <Card body className="recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="card-container">
                    <div className="recipe-name">
                        <Image className="card-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
                        <div className="recipe-card-text-info">
                            <p className="card-title">Прекрасний неймовірний салат </p>
                            <p className="recipe-info">
                                <span className="info-title">Інгредієнти: </span>
                                помідори, огірки, сіль
                            </p>
                            <p className="recipe-info">
                                <span className="info-title">Автор: </span>
                                Ірина Качинська
                            </p>
                        </div>
                    </div>
                    <div className="recipe-likes">
                        <span>25 </span>
                        <button className="recipe-card-like-button"><FavoriteIcon fontSize={"large"}/></button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
export default LikedRecipeCard;