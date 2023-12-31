import React, { useEffect } from 'react'
import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination } from '@mui/material';
import Sidenav from '../component/Sidenav'
import Navbar from '../component/Navbar';
import axios from '../axios';

const Income = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, setUser] = React.useState([])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const GetData = async() => {
    try {
      const res = await axios.get("/getdata");
      setUser(res.data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetData();
  }, []);
  
  const emptyRows =
       rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <>
    <Navbar/>
    <Box height={30}/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    
    <Box component="main" sx={{ flexGrow: 1 }} padding={"100px"}>
        <h2>List of money transfer to your wallet</h2>
        <TableContainer component={Paper}  sx={{maxHeight: "500px"}} >
            <Table aria-label='simple table' stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user
                .map((user) =>(
                  <TableRow hover
                   key={user._id}
                   sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell align='center'>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
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
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
    </Box>
    
    </>
    
  )
}

export default Income

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