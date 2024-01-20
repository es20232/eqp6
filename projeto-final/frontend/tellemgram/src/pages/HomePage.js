import React from "react";

import Button from '@mui/material/Button';

import { useAuth } from '../AuthContext';
import axios from 'axios';

const HomePage = () => {
    const { logOut, accessToken } = useAuth();

    const logoutHandler = () =>{
        logOut();
    }

    const requestToAPI = async () => {

    }

    return(
        <div>
            <h1>Home</h1>
            <Button variant="outlined" onClick={logoutHandler}>LOGOUT</Button>
            <Button variant="outlined" onClick={requestToAPI}>Request</Button>
            
        </div>
    )
}

export default HomePage