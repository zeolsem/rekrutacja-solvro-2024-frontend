import React from "react";
import {Link} from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div>
            <Link to='/cocktails'>
                To cocktails search and view.
            </Link>
        </div>
    )
}

export default HomePage;