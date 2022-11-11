import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , cursor:'pointer' }} >
            <Link to='/' style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}>Interview Scheduler</Link>
          </Typography>
          <Button color="inherit"><Link to='/schedule' style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}>Scheduled Interviews</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
