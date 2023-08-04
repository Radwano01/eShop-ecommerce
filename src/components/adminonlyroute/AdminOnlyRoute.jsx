
import "./adminonlyroute.scss"
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/Slice'
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
    const userEmail = useSelector(selectEmail);
  
    if (userEmail === process.env.REACT_APP_ADMIN_USER) {
      return children;
    }else{
        return(
            <section style={{ height: "80vh" }}>
                <div className="container">
                <h2>Permission Denied.</h2>
                <p>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">
                    <button className="--btn">&larr; Back To Home</button>
                </Link>
                </div>
            </section>

        )

    }

};

export const AdminOnlyLink = ({ children }) => {
    const userEmail = useSelector(selectEmail);
  
    if (userEmail === process.env.REACT_APP_ADMIN_USER) {
      return children;
    }
    return null;
};

export default AdminOnlyRoute