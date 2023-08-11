const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
 
dotenv.config({ path: './config.env'});
require('./db/conn');
//   const User = require('./model/userSchema'); 
app.use(express.json());
app.use(cors({
    credentials: true,
    origin:["http://localhost:5173","http://192.168.246.125:5173"]
}))


app.use(cookieParser());

app.use(require('./router/auth'));

const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`server start on http://localhost:${PORT}`)
})