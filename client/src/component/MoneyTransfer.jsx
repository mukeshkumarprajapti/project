import React, {useState} from 'react'
import { Dialog, Input,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel, Button, InputAdornment
 } from '@mui/material'
 import {  useNavigate  } from 'react-router-dom';
 import { toast, ToastContainer  } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const MoneyTransfer = ({ open, onClose}) => {

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
   
   const sandFund = async (e) => {
    e.preventDefault();

    try {
    
    const response = await fetch('http://localhost:3000/transferMoney', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
      credentials: "include"

    });

    const data = await response.json();



    if(response.status === 201){
      toast.success(data.message, { position: 'top-center' });
      onClose();
      
    } else {
      
      toast.error(data.message, { position: 'top-center' });
    }
    } catch (error) {
      console.error(error);
      toast.error('Server error', { position: 'top-center' });
    }

  }
  return (
    <>
    <Dialog open={open} onClose={onClose}  >
        <DialogTitle>Transfer Fund</DialogTitle>
        
        <DialogContent >
        <FormControl fullWidth sx={{marginTop:'15px'}} variant="standard">
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
          
          <FormControl fullWidth sx={{ marginTop:'15px' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="amount"
            type="input"
            
            autoComplete="off"
            name="amount"
            value={user.amount} 
            onChange={handleInputs}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={sandFund}>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
      </>
  )
}

export default MoneyTransfer