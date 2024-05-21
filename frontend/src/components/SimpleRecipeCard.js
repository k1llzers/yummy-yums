import Card from 'react-bootstrap/Card';
import '../styles/SimpleRecipeCard.css'
import Image from 'react-bootstrap/Image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const SimpleRecipeCard = () => {

    return (
        <Card body className="simple-recipe-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="simple-card-container">
                    <div className="simple-recipe-name">
                        <Image className="simple-card-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
                        <p className="simple-card-title">Прекрасний неймовірний салат </p>
                    </div>
                    <div className="simple-recipe-likes">
                        <span className="simple-likes-item">25 <FavoriteBorderIcon/></span>
                        <span >30 <ChatBubbleOutlineIcon/></span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SimpleRecipeCard;