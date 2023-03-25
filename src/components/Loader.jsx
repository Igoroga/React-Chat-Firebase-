import React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <Grid container>
        <Grid container
         style={{height: window.innerHeight - 50}}
         alignItems={"center"}
         justifyContent={"center"}
         > 
            <Grid>
                <Box p={5}>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </Box>
            </Grid>
        </Grid>
    </Grid>
    );
};

export default Loader;