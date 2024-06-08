import {Link} from "react-router-dom";
import '../styles/ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className="error-page-main-container">
            <p className="error-page-title">Oops...</p>
            <p className="error-page-title">Page not found</p>
            <Link className="card-title-a" to="/">
                <p className="error-page-link">На головну</p>
            </Link>
        </div>
    )
}

export default ErrorPage;