import React, { useEffect, useState } from 'react'
import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Typography, Button } from '@mui/material';
import Sidenav from '../component/Sidenav'
import Navbar from '../component/Navbar';
import MoneyTransfer from '../component/MoneyTransfer';
import AddMoney from '../component/AddMoney';


const Transaction = () => {
    const [userData, setUserData] = useState({});
  const [users, setusers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const formatDate = (dateString) => {
    const options = { day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',};
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmDialog = () =>{
    setOpenDialog(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const emptyRows =
       rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

       const callAboutPage = async () => {
        try {
            const res = await fetch('http://localhost:3000/getdata',{
            method: 'GET',
            headers: {
               'Accept': 'application/json',
                "Content-Type" : 'application/json'
              },
              credentials: "include"
          });
    
          const data = await res.json();
          
          setUserData(data);
    
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
    
    
        } catch(err) {
          console.log(err);
          navigate('/login');
        }

        
          const res = await fetch('http://localhost:3000/transaction', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
                
               });
          
               const data = await res.json();
               setusers(data)
          
               if(data.status === 201){
                console.log('data')
               }

        
    
      } 
      
      

       useEffect(() => {
        callAboutPage();
      }, []); 

     console.log(users)

  return (
    <>
    <Navbar/>
    <Box height={30}/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    
    <Box component="main" sx={{ flexGrow: 1 }} padding={"50px"}>
    <Typography variant='h4'  sx={{fontWeight: "400", marginTop:"0", textTransform:" capitalize", marginBottom:"10px"}}>transation history</Typography>
    <Typography variant='h5' sx={{ fontWeight:"bold", marginBottom:"10px", display:'inline-block'}}>balance : ${userData.balance}</Typography>
    <Button variant="contained" sx={{float:"right", marginBottom:"10px"}} onClick={handleOpenDialog}>Add fund</Button>
        <TableContainer component={Paper}  sx={{maxHeight: "500px"}} >
            <Table aria-label='simple table' stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Transation Id</TableCell>
                  <TableCell>user Id</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              {users.filter((user) => user.sender === userData._id || user.receiver === userData._id).length > 0 ? (
              <TableBody>
                {users
                   .filter((user) => user.sender === userData._id || user.receiver === userData._id)
                .map((user) =>(
                  <TableRow hover
                   key={user._id}
                   sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{formatDate(user.timestamp)}</TableCell>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{(user.sender === userData._id ) ? user.receiverUserId : user.senderUserId}</TableCell>
                    <TableCell>{(user.sender === userData._id ) ? "send" : "recive"}</TableCell>
                    <TableCell>{user.amount}</TableCell>
                   </TableRow>
                ))}
                
                
              </TableBody>
              ) : (
                <TableBody>
                  <TableRow style={{ height: 53 }}>
                    <TableCell colSpan={5} align='center'>
                      <Typography variant="h5">You have not made any transactions yet.</Typography>
                      
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={users.filter((user) => user.sender === userData._id || user.receiver === userData._id).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
    </Box>
    <AddMoney
      open={openDialog}
      onClose={handleCloseDialog}
      onConfirm={handleConfirmDialog}
      />
    </>
    
  )
}

export default Transaction

const rows = [{
  "id": 1,
  "full_name": "Elene",
  "date": "12/05/2003",
  "email": "eklimochkin0@sourceforge.net"
},
 {
  "id": 2,
  "full_name": "Celina",
  "date": "16/11/2023",
  "email": "cledbury1@jalbum.net"
}, {
  "id": 3,
  "full_name": "Fancy",
  "date": "12/12/2023",
  "email": "fjedrasik2@so-net.ne.jp"
}, {
  "id": 4,
  "full_name": "Jamal",
  "date": "10/12/2023",
  "email": "jgleave3@loc.gov"
}, {
  "id": 5,
  "full_name": "Rosy",
  "date": "8/12/2023",
  "email": "rdooher4@admin.ch"
}, {
  "id": 6,
  "full_name": "Breanne",
  "date": "18/12/2023",
  "email": "bshelper5@wordpress.com"
}, {
  "id": 7,
  "full_name": "Carey",
  "date": "18/12/2023",
  "email": "cwhitter6@seattletimes.com"
}, {
  "id": 8,
  "full_name": "Joaquin",
  "date": "18/12/2023",
  "email": "jimlach7@comcast.net"
}, {
  "id": 9,
  "full_name": "Rockie",
  "date": "18/12/2023",
  "email": "rkarpychev8@gravatar.com"
}, {
  "id": 10,
  "full_namee": "Salomo",
  "date": "18/12/2023",
  "email": "srobison9@blogger.com"
}, {
  "id": 11,
  "ffull_name": "Delaney",
  "date": "18/12/2023",
  "email": "dfarleigha@hostgator.com"
}, {
  "id": 12,
  "full_name": "Umberto",
  "date": "18/12/2023",
  "email": "uvettoreb@ebay.co.uk"
}, {
  "id": 13,
  "full_name": "Steven",
  "date": "18/12/2023",
  "email": "shurnec@wp.com"
}, {
  "id": 14,
  "full_name": "Meade",
  "date": "18/12/2023",
  "email": "mriched@homestead.com"
}, {
  "id": 15,
  "full_name": "Marleen",
  "date": "18/12/2023",
  "email": "mdunnee@youtu.be"
}, {
  "id": 16,
  "full_name": "Ulrikaumeko",
  "date": "18/12/2023",
  "email": "uschumacherf@discuz.net"
}, {
  "id": 17,
  "full_name": "Felike",
  "date": "18/12/2023",
  "email": "fbetoniag@t.co"
}, {
  "id": 18,
  "full_name": "Ronica",
  "date": "18/12/2023",
  "email": "rchapierh@ustream.tv"
}, {
  "id": 19,
  "full_name": "Tamar",
  "date": "8/12/2023",
  "email": "ttoffolinii@howstuffworks.com"
}, {
  "id": 20,
  "full_name": "Melvin",
  "date": "18/12/2022",
  "email": "mjeffressj@imdb.com"
}, {
  "id": 21,
  "full_name": "Tamar",
  "date": "16/12/2003",
  "email": "ttoffolinii@howstuffworks.com"
}, {
  "id": 22,
  "full_name": "Melvin",
  "date": "18/12/2023",
  "email": "mjeffressj@imdb.com"
}]

