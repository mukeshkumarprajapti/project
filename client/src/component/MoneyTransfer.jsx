import React, {useState} from 'react'
import { Dialog, Input,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel, Button
 } from '@mui/material'
 import {  useNavigate  } from 'react-router-dom';

 

const MoneyTransfer = ({ open, onClose, onConfirm }) => {

  const navigate  = useNavigate();



  const [user, setUser] = useState({
    receiverId:'', amount:'' 
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

    try {
    
    const response = await fetch('http://localhost:3000/transferMoney', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
      credentials: "include"

    });

    const data = await response.json();



    if(response.status === 400){
      
      toast.error(data.message, { position: 'top-center' });
    }else{

      toast.success(data.message, { position: 'top-center' });
      navigate('/');
    }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Login failed', { position: 'top-center' });
    }

  }
  return (
    <>
    <Dialog open={open} onClose={onClose} >
        <DialogTitle>Transfer Fund</DialogTitle>
        <DialogContent >
        <FormControl fullWidth sx={{marginTop:'15px'}}>
            <InputLabel htmlFor="account-number" >userId</InputLabel>
            <Input
              id="receiverId"
              type="text"
              
              autoComplete="off"
              name="receiverId"
              value={user.receiverId} 
              onChange={handleInputs}
              
            />
          </FormControl>
          <FormControl fullWidth sx={{marginTop:'15px'}}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              id="amount"
              type="number"
              
              autoComplete="off"
              name="amount"
              value={user.amount} 
              onChange={handleInputs}
              
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={PostData}>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
      </>
  )
}

export default MoneyTransfer