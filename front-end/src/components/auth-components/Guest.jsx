import React from 'react';
import { Button } from '@mui/material';

const Guest = ({ handleLogin }) => {

    return (
        <div>
            <Button variant="contained" color="success" onClick={() => handleLogin("guest@gmail.com")}>
                Login as a Guest
            </Button>
        </div>
    )
}

export default Guest;