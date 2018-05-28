import React from 'react';
import { Link } from 'react-router-dom';

// Link is linking between one react-routr page to another
// This happens in the client side. 
// we could also use an <a> anchor tag, but it will not use the client side routing.
const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;