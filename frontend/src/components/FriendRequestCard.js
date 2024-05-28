import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import '../styles/FriendRequestCard.css'
const FriendRequestCard = () =>{
    return(
        <Card body className="friend-card">
            <Card.Body style={{padding: "0px 5px"}}>
                <div className="friend-card-container">
                    <div className="friend-request-info">
                        <div className="request-card-text-info">
                            <p className="request-info-title">Запит від:</p>
                            <div className={'single-account'}>
                                <Image className="friend-card-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
                                Григорій Сковорода
                            </div>
                            <div className="request-info">
                                <span className="request-info-title">Назва сімʼї:</span>
                                люта дрістальня
                            </div>
                        </div>
                        <div className="request-card-text-info" >
                            <p className="request-info-title">Склад сімʼї:</p>
                            <div className={'single-account'}>
                                <Image className="friend-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                            <div className={'single-account'}>
                                <Image className="friend-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Окунь Петрович
                            </div>
                            <div className={'single-account'}>
                                <Image className="friend-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Галина Антонівна
                            </div>

                        </div>
                    </div>
                    <div className="friends-request-button">
                        <button className="friend-card-accept-button">Прийняти <FavoriteBorderIcon fontSize="large"/>
                        </button>
                        <button className="friend-card-reject-button">Відхилити <FavoriteBorderIcon fontSize="large"/>
                        </button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
export default FriendRequestCard;