import React, {useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
  const navigate = useNavigate()

  const {id, token} = useParams();

  const [password, setPassword] = useState("");

  const [massage, setMassage] = useState('');


  const userValid = async () => {
    const res = await fetch(`http://localhost:3000/resetpassword/${id}/${token}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      
     });

     const data = await res.json();

     if(data.status === 201){
      console.log('user valid')
     }else{
      navigate('')
     }

  }

  

   const handleInputs = (e) => {
    setPassword(e.target.value)
   }


   const sendpassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/${id}/${token}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         password
      }),
      credentials: "include"

    });

    const data = await res.json();

     if(data.status === 201){
      setPassword("")
      setMassage(true)
     }else{
      res.status(401).json({status:401, error:"token Expired generate new Link"})
     }

   }

  useEffect(() =>{
    userValid()
  },[])
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
      
      <Typography component="h1" variant="h5">
        Enter Your New Password 
      </Typography>
      <Box component="form" noValidate  sx={{ mt: 3 }}>

      {massage ? <p style={{color: 'green', fontWeight: 'bold'}}>password Successfully Update</p>: " "}

        <Grid container spacing={2}>
  
          
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password} 
              onChange={handleInputs} 
              autoComplete="new-password"
            />
          </Grid>
          
          
          
          
          
          
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color='success'
          sx={{ mt: 3, mb: 2 }}
          onClick={sendpassword}
        >
          Reset Password
        </Button>
        
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant='body2' >
                 Don't have a Code? 
                 <NavLink href="#/" variant="body2">
                   Resend Code
                 </NavLink>
            </Typography>
            
          </Grid>
        </Grid>
        
        
        
      </Box>
    </Paper>

</Container>
  )
}



export default ResetPassword