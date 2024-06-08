import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import '../styles/FriendRequestCard.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
const FriendRequestCard = () =>{
    return(
        <Card body className="friend-card">
            <Card.Body >
                <div className="friend-card-container">
                    <div className="friend-request-info">
                        <div className="request-card-text-info">
                            <p className="request-info-title">Запит від:</p>
                            <div className={'single-account'}>
                                <Image className="friend-card-image" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" />
                                Григорій Сковорода
                            </div>
                            <p className={'request-info-title'}>Назва сімʼї:</p>
                            <p className={'request-info'}>цікава сімейка</p>
                        </div>
                        <div className="request-card-text-info">
                            <p className="request-info-title">Склад сімʼї:</p>
                            <div className={'single-account'}>
                                <Image className="friend-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Анатолій Журба
                            </div>
                            <div className={'single-account'}>
                                <Image className="friend-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Артемій Петрович
                            </div>
                            <div className={'single-account'}>
                                <Image className="friend-card-image"
                                       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"/>
                                Галина Антонівна
                            </div>

                        </div>
                    </div>
                    <div className="friends-request-button">
                        <button className="friend-card-accept-button">Прийняти <VerifiedIcon/>
                        </button>
                        <button className="friend-card-reject-button">Відхилити <CancelIcon/>
                        </button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
export default FriendRequestCard;