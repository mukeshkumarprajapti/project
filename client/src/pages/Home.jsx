import React, {useEffect, useState } from 'react'
import Sidenav from '../component/Sidenav'
import Navbar from '../component/Navbar';
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Paper, TextField, TableContainer, Table, TableHead, TableBody, TableRow,  TablePagination, Modal,   Typography, 
 } from '@mui/material'
 import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useNavigate  } from 'react-router-dom'
import MoneyTransfer from '../component/MoneyTransfer';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:"20px",
  
  
  
};



const Home = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [buttonColor, setButtonColor] = useState('primary');
  

  
 

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setButtonColor('success');
    } catch (error) {
      console.error('Error copying text:', error);
      setIsCopied(false);
      setButtonColor('secondary'); 
    }
  
    setTimeout(() => {
      setIsCopied(false);
      setButtonColor('secondary');
    }, 2000);
  };
  
  
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  
  
  
  const emptyRows =
       rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

       const callAboutPage = async () => {
        try {

          setLoading(true);

          const res = await axios.get('/',{
            
            headers: {
               'Accept': 'application/json',
                "Content-Type" : 'application/json'
              },
              withCredentials: true,
          });
    
          const data = res.data
          
          setUserData(data);
    
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
    
    
        } catch(err) {
          console.log(err);
          navigate('/login');
        } finally {
          setLoading(false);
        }

        const res = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
          
         });
    
         const data = await res.json();
         setusers(data)
    
         if(data.status === 201){
          console.log('user valid')
         }
    
      } 
      
      

       useEffect(() => {
        callAboutPage();
      }, []);  
      
     console.log(users)
      
      const referralLink = `http://localhost:5173/registration?referralcode=${userData.userId}`
  return (
    <>
    <Navbar/>
    <Box height={50}/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    
        <Typography variant='h4'  sx={{fontWeight: "400", marginTop:"0", textTransform:" capitalize"}}>welcome back {userData.firstname +' ' + userData.lastname}</Typography>
        <Box  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{padding:"10px"}}>
                <Typography variant='h6' >Wellet Balance</Typography><br/>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                  <Typography variant='h4'>${userData.balance}</Typography>
                  </Grid>
                  <Grid item xs={6}  >
                  <Button variant='contained' sx={{float:'right'}} onClick={handleOpenDialog}>Transfer fund</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{padding:"10px"}}>
                <Typography variant='h6' >No. of Refferals </Typography><br/>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                  <Typography variant='h4'>{userData.number_of_refficients}</Typography>
                  </Grid>
                  <Grid item xs={6}  >
                  <Button variant='contained' sx={{float:'right'}} onClick={handleOpen}>share link</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Box component={'container'} sx={{ mt: 3, ml:2 }}>
              <Typography variant='h5'>List of your refferals</Typography><br/>
              <TextField
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
  

            </Box>

            <TableContainer component={Paper}  sx={{maxHeight: "500px", mt:3}} >
            <Table aria-label='simple table' stickyHeader>
              <TableHead >
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Full Name</StyledTableCell>
                  <StyledTableCell >Email</StyledTableCell>
                  
                </TableRow>
              </TableHead>
              {users.filter((user) => user.referral_id == userData.userId).length > 0 ? (
              <TableBody>
              {users
              .filter((user) => user.referral_id == userData.userId)
              .map((user) =>(
                  <TableRow hover
                   key={user._id}
                   sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.firstname} {user.lastname}</TableCell>
                    <TableCell >{user.email}</TableCell>
                   
                   </TableRow>
                ))}
                {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                
              </TableBody>
              ) : (
                <TableBody>
                  <TableRow style={{ height: 53 }}>
                    <TableCell colSpan={5} align='center'>
                      <Typography variant="h5" sx={{}}>You have not  any refferls yet.</Typography>
                      
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.filter((user) => user.referral_id == userData.userId).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
          </Grid>
        </Box>
    



      </Box>
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h5" component="h2">
          Share the referral link
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
            <Typography sx={{ my: 2, background:"gray", padding:'10px', borderRadius:'5px', }} variant="h6" >
            {referralLink}
            </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button variant="contained" onClick={handleCopyText} color={buttonColor}
              sx={{ my: 2,padding:'10px', float:'right', width:'150px', fontWeight: 'bold' }}  >
                <FileCopyIcon />
                {isCopied ? 'Copied' : 'Copy'}
            </Button>
            
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <MoneyTransfer
      open={openDialog}
      onClose={handleCloseDialog}
      onConfirm={handleConfirmDialog}
      />
      
      <ToastContainer />
    
    </>
    
  )
}

export default Home

