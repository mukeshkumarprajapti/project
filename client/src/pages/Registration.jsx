import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { NavLink, useNavigate, useLocation  } from 'react-router-dom'
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    firstname:'', email:'', phone:'', lastname:'', password:'', conform_password:'', referral_id:'',
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('referralcode');

    if (referralCode) {
      setUser({ ...user, referral_id: referralCode });
    }
  }, [location.search]);



  let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }

  
  

   const PostData = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      });
  
      const data = await response.json();
  
      if(response.status === 201){
        toast.success(data.message, { position: 'top-center' });
        navigate('/login');
      }else if (response.status === 400 ) {
        // Registration failed, handle error messages
        toast.error(data.message, { position: 'top-center' });
      } else {
        // Handle other status codes as needed
        toast.error('Server error', { position: 'top-center' });
      }
      
    }catch (error) {
      console.error("Registration error:", error);
      toast.error('Registration failed', { position: 'top-center' });
    }

   
   
   };

   
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
              InputProps={{
                readOnly: true,
              }}
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
          <FormControl fullWidth required  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            
            
            name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="off"
              value={user.password}
              onChange={handleInputs}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility/> : <VisibilityOff  />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth required  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            
            
            name="conform_password"
            label=""
            type={showPassword ? 'text' : 'password'}
            id="conform_password"
            autoComplete="off"
            value={user.conform_password}
            onChange={handleInputs}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            
          />
        </FormControl>
             
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
                 <NavLink to="/login" >Sign In</NavLink>
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
    <ToastContainer />

</Container>
  )
}

export default Registration