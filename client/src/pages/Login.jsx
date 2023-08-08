import React, {useState}  from 'react'
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

const Login = () => {
  const navigate  = useNavigate();



  const [user, setUser] = useState({
    userId:'', password:'' 
   });

   let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }
   
   const PostData = async (e) => {
    e.preventDefault();

    const { userId, password} = user;
    
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId, password
      }),
      credentials: "include"

    });

    const data = await res.json();



    if (res.status === 400 || !data ) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else{
      window.alert("login successfull");
      console.log("login done");
      navigate('/')
     
      

      
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
        Sign In
      </Typography>
      <Box component="form"  method="POST" noValidate  sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="userId"
              label="User I'd "
              type="text"
              id="userId"
              autoComplete="userId"
              value={user.userId} 
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
              autoComplete="new-password"
              value={user.password} 
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12} justifyContent={'space-between'}>
            <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label='Remember me'/>

            </FormGroup>
           </Grid>
            <Grid item xs={6} >
            <NavLink to="/forgetpassword" >ForgetPassword</NavLink>

            </Grid>
            
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
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant='body2' >
                 Don't have an account? 
                 <NavLink to="/registration" >Sign Up</NavLink>
            </Typography>
            
          </Grid>
        </Grid>
        
        
      </Box>
    </Paper>

</Container>
  )
}

export default Login