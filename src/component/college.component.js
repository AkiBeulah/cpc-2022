import React from 'react';
import { Link } from 'react-router-dom';

const College = (props) => {
    return(
        <Link to={`/pictures/${props.college}`}>
            <div class="transition duration-150 ease-in-out delay-75 hover:bg-gray-100 hover:scale-110 w-56 h-20  mb-3 lg:mb-2 bg-gray-300">
            </div>
        </Link>
    );
}

export default College;