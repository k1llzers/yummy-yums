import {useEffect, useState} from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";

const SingleAccount = ({id, pib, myId})=>{
    const defaultUserPhoto = "https://i.pinimg.com/564x/77/00/70/7700709ac1285b907c498a70fbccea5e.jpg";
    const [userPhoto, setUserPhoto] = useState(defaultUserPhoto);
    const fetchUserPhoto = async () => {
        if (!id) return;
        await axios.get("http://localhost:8080/api/user/get-user-image/" +id, {
            responseType: "blob"
        }).then((response) => {
            if(response.data.type === 'application/json') return;
            setUserPhoto(URL.createObjectURL(response.data));
        });
    }
    useEffect(() => {
        fetchUserPhoto();
    }, [id]);
    return (
        <div className={'single-account'}>
            <Image className="friend-card-image"
                   src={userPhoto}
                   style={{objectFit:"cover"}}
            />
            {myId == id ? <a
                className="card-title-a"
                href={``}
                style={{color:"#3D6827"

            }}
            >
                {pib}
            </a> : <a
                className="card-title-a"
                href={`/user/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{color:"#3D6827"}}
            >
                {pib}
            </a>}
        </div>
    );
}
export default SingleAccount;