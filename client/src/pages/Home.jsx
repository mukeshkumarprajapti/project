import React, {useEffect, useState } from 'react'
import Sidenav from '../component/Sidenav'
import Navbar from '../component/Navbar';
import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Modal,   Typography, 
 } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate  } from 'react-router-dom'
import MoneyTransfer from '../component/MoneyTransfer';

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
  
  
  const emptyRows =
       rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

       const callAboutPage = async () => {
        try {
          const res = await fetch('http://localhost:3000',{
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
      }     

       useEffect(() => {
        callAboutPage();
      }, []);   
      
      const referralLink = `http://localhost:5173/registration?referralcode=${userData.userId}`
  return (
    <>
    <Navbar/>
    <Box height={50}/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    
        <Typography variant='h4'  sx={{fontWeight: "400", marginTop:"0", font: "captalize"}}>welcome back {userData.firstname +' ' + userData.lastname}</Typography>
        <Box  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{padding:"10px"}}>
                <Typography variant='h6' >Wellet Balance</Typography><br/>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                  <Typography variant='h4'>$0</Typography>
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
                  <Typography variant='h4'>0</Typography>
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
              <TableHead sx={{backgroundColor:'gray'}}>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) =>(
                  <TableRow hover
                   key={row.id}
                   sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.full_name}</TableCell>
                    <TableCell align='center'>{row.email}</TableCell>
                    <TableCell>{row.date}</TableCell>
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
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
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
      />
      
      <ToastContainer />
    
    </>
    
  )
}

export default Home

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