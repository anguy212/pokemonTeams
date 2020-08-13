import React, {useState, useEffect} from 'react';
import {useLocation, Redirect} from 'react-router-dom';


const Login = () => {
    const location = useLocation()
    console.log(location)
    if (typeof location.state === "undefined")
    {
        return (
            <div>
                Login
                Need to Login
            </div>
        )
    }
    else
    {
        return <Redirect to = "/profile"/>
    }
}

export default Login
