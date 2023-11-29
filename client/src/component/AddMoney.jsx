import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, } from '@mui/material'
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';

const AddMoney = ({ open, onClose}) => {
  const [amount, setAmount] = useState();



  const onToken = async(token) => {

    try {
      const response = await fetch('http://localhost:3000/AddMoney', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token, amount}),
      credentials: "include"

    });

    const data = await response.json();



    if(response.status === 200){
      toast.success(data.message, { position: 'top-center' });
      onClose();
      
    } else {
      
      toast.error(data.message, { position: 'top-center' });
    }
    } catch (error) {
      
    }
    console.log(token);
  }
    
  
  return (
    <>
    <Dialog open={open} onClose={onClose} maxWidth="md" >
        <DialogTitle>Enter the amount you want to deposit</DialogTitle>
        
        <DialogContent >
        <FormControl fullWidth sx={{marginTop:'15px'}} variant="standard">
            <InputLabel htmlFor="account-number" >Amount</InputLabel>
            <Input
              id="receiverId"
              type="input"
              value={amount}
              autoComplete="off"
              name="receiverId"
              onChange={(e) => setAmount(e.target.value)}
              
            />
          </FormControl>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <StripeCheckout
        token={onToken}
        
        amount={amount * 100}
        shippingAddress
        stripeKey="pk_test_51OCxndSIjNbNfdSSRsNCLwdzLkYHa9Q01i6zWpQM0hkDuK7HnVOf8CutKl2EaxmmsuVH4ydQ033zwenjklT69Iy800o0YE0g6I"
      >
        <Button color="primary" onClick={onToken}>
            Transfer
          </Button>
      </StripeCheckout>
          
        </DialogActions>
      </Dialog>
      
      </>
  )
}

export default AddMoney