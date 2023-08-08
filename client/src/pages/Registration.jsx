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
import { NavLink, useNavigate  } from 'react-router-dom'

const Registration = () => {

  const navigate = useNavigate();

  

  const [user, setUser] = useState({
    referral_id: " ", firstname: " ", lastname: " ", email:" ", phone:" ", password: " ", conform_password:" "
  });

  let name, value;

  const handleInputs = (e) => {
       console.log(e);
       name = e.target.name;
       value = e.target.value;

       setUser({...user, [name]:value})
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { referral_id, firstname, lastname, email, phone, password, conform_password } = user;

    const res = await fetch("http://localhost:3000/register",{
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        referral_id, firstname, lastname, email, phone, password, conform_password
      })
    });
     
    const data = await res.json();
    
    if(res.status === 422 || !data ) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else{
      window.alert(" Registration successful");
      console.log(" Registration successful");
      navigate('/login');
      
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
        Sign up
      </Typography>
      <Box component="form" method='POST'   sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              fullWidth
              name="referral_id"
              label="Referral Id"
              type="text"
              id="referral_id"
              autoComplete="off"
              value={user.referral_id}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="off"
              name="firstname"
              required
              fullWidth
              id="firstname"
              label="First Name"
              autoFocus
              value={user.firstname}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="off"
              value={user.lastname}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              value={user.email}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Mobile No."
              type="text"
              id="phone"
              autoComplete="off"
              value={user.phone}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              value={user.password}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="conform_password"
              label="Conform Password"
              type="password"
              id="conform_password"
              autoComplete="off"
              value={user.conform_password}
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
          onClick={PostData}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant='body2' >
                 Already have an account? 
                 <NavLink to="/signin" >Sign In</NavLink>
            </Typography>
            
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} marginTop={3}>
            <Typography variant='body1'>
            By registering, I agree to  Terms of Service and Privacy Policy.
            </Typography>
        </Grid>
        
      </Box>
    </Paper>

</Container>
  )
}

export default Registration