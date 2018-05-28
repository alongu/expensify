// Higher Order Component (HOC) - A component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const info = (props) => (
    <div>
        <h1>info</h1>
        <p> The info is: {props.info} </p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    // The return here is the HOC
    return (props) => (
        <div> 
            {props.isAdmin && <p>This is private info. Please don't share</p>}  
            <WrappedComponent {...props}/>
        </div>
    );
};

// This is just a regular function that returns the Higher Order Component
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props}/>) : (<p>Please Log in to view the info</p>)}
        </div>
    );
};

const AdminInfo = withAdminWarning(info);
const AuthInfo = requireAuthentication(info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="there are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="there are the details" />, document.getElementById('app'));