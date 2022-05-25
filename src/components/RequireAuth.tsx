import React from 'react';
import {Navigate, useLocation} from "react-router-dom";

type RequireAuthProps = {
    allowedRoles: [string],
}

const RequireAuth: React.FC<RequireAuthProps> = props => {
    const location = useLocation()
    const isAuthenticated = false

    return (
        <>
            {isAuthenticated ?
                props.children :
                <Navigate to="/login" state={{from: location}} replace/>}
        </>
    )
}

export default RequireAuth