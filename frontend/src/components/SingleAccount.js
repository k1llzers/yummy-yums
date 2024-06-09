import {useEffect, useState} from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";

const SingleAccount = ({id, pib})=>{
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
            {pib}
        </div>
    );
}
export default SingleAccount;