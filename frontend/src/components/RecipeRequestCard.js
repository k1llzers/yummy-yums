import '../styles/RecipeRequestCard.css'
import Card from "react-bootstrap/Card";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import {Link} from "react-router-dom";
import axios from "axios";

const RecipeRequestCard = ({id, title, author, description, updateRequests}) => {

    const handleApprove = async () => {
        await axios.put("http://localhost:8080/api/recipe/approve/" + id);
        updateRequests();
    }

    const handleReject = async () => {
        await axios.put("http://localhost:8080/api/recipe/reject/" + id);
        updateRequests();
    }

    return (
        <Card body className="friend-card">
            <Card.Body >
                <div className="recipe-request-card-container">
                    <div className="recipe-request-info">
                        <Link className="card-title-a" to={`/recipe/${id}`}><p className="recipe-request-title">{title}</p></Link>
                        <p className="recipe-request-info-item">
                            <span className="recipe-request-info-title">Автор: </span>
                            {author.pib}
                        </p>
                        <p className="recipe-request-info-item">
                            <span className="recipe-request-info-title">Короткий опис: </span>
                            {description}
                        </p>
                    </div>
                    <div className="friends-request-button">
                        <button className="friend-card-accept-button" onClick={handleApprove}>Прийняти <VerifiedIcon/></button>
                        <button className="friend-card-reject-button" onClick={handleReject}>Відхилити <CancelIcon/></button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RecipeRequestCard;