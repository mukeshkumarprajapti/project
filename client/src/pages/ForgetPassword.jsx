import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import {NavLink} from 'react-router-dom'

const ForgetPassword = () => {


  



  const [user, setUser] = useState({
    email:''
   });

   let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }
   
   const sandLink = async (e) => {
    e.preventDefault();

    const { email} = user;
    
    const res = await fetch('http://localhost:3000/forgetpassword', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         email
      }),
      credentials: "include"

    });

    const data = await res.json();



    if (res.status === 401 || !data ) {
      window.alert("email  Id not exist");
      console.log("email  Id not exist");
    } else{
      window.alert("Email sent, please check your email");
      console.log("Email sent, please check your email");
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
            borderRadius: '20px',
            paddingBottom: '50px'
          }}
          elevation={3}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget your password
          </Typography>
          <Typography component="h1" variant="body2" fontWeight={'200'} fontSize={'15px'} marginTop={'10px'}>
          Please enter the Email   associated with your account.
          </Typography>
          <Box component="form" method="POST" noValidate  sx={{ mt: 3,
          width: '100%' }}>
            <Grid container >
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Enter your email "
                  type="text"
                  id="email"
                  value={user.email}
                  onChange={handleInputs}
                  autoComplete="off"
                />
              </Grid>
              
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='success'
              sx={{ mt: 3, mb: 2 }}
              onClick={sandLink}
            >
              Reset Password
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant='body2' marginTop={'20px'} >
                    
                     <NavLink to="/login" variant="body2">
                       Return to Sign In
                     </NavLink>
                </Typography>
                
              </Grid>
            </Grid>
            
            
          </Box>
        </Paper>

    </Container>
  )
}

export default ForgetPassword