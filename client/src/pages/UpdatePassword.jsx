import React, {useState, useEffect}  from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import {  useNavigate  } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const UpdatePassword = () => {
  const navigate  = useNavigate();

  const [user, setUser] = useState({
    currentpassword:'', newpassword:'' 
   });

   let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }
   
   const updateData = async (e) => {
    e.preventDefault();

    const { currentpassword, newpassword} = user;
    const token = localStorage.getItem('jwtoken');
    try {
         // Get the stored token
        const response = await fetch('http://localhost:3000/updatepassword', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include the JWT token in the request headers
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            currentpassword,
            newpassword,
          }),
          credentials: "include"
        });
  
        const data = await response.json();
        console.log(data.message);
        navigate('/');
      } catch (error) {
        console.error('An error occurred:', error);
      }
   
   }
   
 


      
  return (
    <Container component="main" maxWidth="sm">
        
    <Paper
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '20px'
      }}
      elevation={3}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Please Enter Your Data  
      </Typography>
      <Box component="form"  method="POST" noValidate  sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="currentpassword"
              label="Currnnt Password "
              type="password"
              id="currentpassword"
              autoComplete="usecurrentpasswordrId"
              value={user.currentpassword} 
              onChange={handleInputs}
            />
          </Grid>
          
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="newpassword"
              label="New Password"
              type="password"
              id="newpassword"
              autoComplete="newpassword"
              value={user.newpassword} 
              onChange={handleInputs}
            />
          </Grid>
    </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color='success'
          sx={{ mt: 3, mb: 2 }}
          onClick={updateData}
        >
          Update Password
        </Button>
        
        
        
      </Box>
    </Paper>

</Container>
  )
}

export default  UpdatePassword 
