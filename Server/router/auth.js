const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring")
const authenticate = require('../middleware/authenticate');


require("../db/conn");
const User = require("../model/userSchema");
 const transporter = require("../emailSend/transporter");

//  homepage route
 router.get('/', authenticate , (req, res) => {
  console.log(`hello my about`);
  res.send(req.rootUser);
});

  // registration route

 router.post("/register", async (req, res) => {
    const { referral_id, firstname, lastname, email, phone, password, conform_password  } = req.body;
  
    if ( !firstname || !lastname || !email || !phone || !password|| !conform_password ) {
      return res.status(422).json({ error: "plz filled the field property" });
    }

    let startingUserId = 1006090;
    let isUnique = false;
  
    try {
      while (!isUnique) {
        const existingUser = await User.findOne({ userId: startingUserId }).lean();
  
        if (!existingUser) {
          isUnique = true;
        } else {
          startingUserId++;
        }
      }
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(422).json({ error: "Email already Exist" });
      } else if (password != conform_password) {
        return res.status(422).json({ error: "password are not matching" });
      } else {
        const user = new User({ referral_id,    userId: startingUserId, firstname, lastname, email, phone,  password, conform_password  });
  
        await user.save();  

        const info = await transporter.sendMail({
          from:'prajaptimukesh770@gmail.com', 
          to:email,
          subject: "sending Email for password reset",
          text: `your user Id is ${startingUserId}`
        })

        console.log("Message sent: %s", info.messageId);
  
        res.status(201).json({ massage: "user registered successfuly" });
      
      }
    } catch (err) {
      console.log(err);
    }
  });
 

    //  login route

  router.post("/login", async (req, res) => {
    try {
      const { userId, password } = req.body;
  
      if (!userId || !password) {
        return res.status(400).json({ error: "plz filled the data" });
      }
  
      const userLogin = await User.findOne({ userId: userId });
  
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
  
        const token = await userLogin.generateAuthToken();
        console.log(token);
  
        res.cookie("jwtoken", token, {
           expires:new Date(Date.now() + 25892000000 ),
           httpOnly:true
          });
  
        if (!isMatch) {
          res.status(400).json({ error: "Invalid Credientials" });
        } else {
          res.json({ massage: "user Singin Successfully" });
        }
      } else {
        res.status(400).json({ error: "Invalid Credientials" });
      }
    } catch (err) {
      console.log(err);
    }
  });

  // logout route

  router.get('/logout', (req, res) => {
    console.log('hello my logout');
    res.clearCookie('jwtoken', {path:'/'})
    res.send(req.rootUser);
  });


  // forgetpassword route


  router.post('/forgetpassword', async (req, res) => {
    const { email } = req.body;
  
    if (!email ) {
      return res.status(404).json({ error: "plz filled the data" });
    }
  
    try{
    
  
      const Data = await User.findOne({ email: email });
  
      const token = jwt.sign({_id:Data._id}, process.env.SECRET_KEY ,{
        expiresIn:'120s'
      });
    
      // const token = randomstring.generate();
  
  
  
      const setusertoken = await User.findByIdAndUpdate({_id:Data._id},{verifiTokan:token},{new:true});
  
      if(setusertoken){
        const mailOption = {
              from:'prajaptimukesh770@gmail.com', 
              to:email,
              subject: "sending Email for password reset",
              text: `This Link Valid For 1 MINUTES http://localhost:5173/resetpassword/${Data._id}/${setusertoken.verifiTokan} `
             
            }
  
            transporter.sendMail(mailOption,(error, info)=>{
              if(error){
                console.log("error", error);
                res.status(401).json({status:201, massage: "email not sent"})
              }else{
                console.log("Email sent", info.response);
                res.status(201).json({status:201, massage: "email  sent successfully"})
            }
      })
    }
  
    }catch (error) {
      res.status(401).json({status:401, massage: "Invalid user"})
    }
  })


//verify user for forget password

router.get("/resetpassword/:id/:token", async (req, res) => {
  const {id, token} = req.params;
  try{
    const validuser = await User.findOne({_id:id, verifiTokan:token});

    // const verifytoken = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(verifytoken)

    if(validuser){
      res.status(201).json({status:201, validuser})
    }else{
      res.status(401).json({status:401, message:"user not exist"})
    }

  }catch(error){
    res.status(401).json({status:401, error:"token not find"})
  }
})


//change password

router.post("/:id/:token", async (req, res) => {
  const {id, token} = req.params;

  const {password} = req.body;

  try{
    const validuser = await User.findOne({_id:id, verifiTokan:token});

    if(validuser ){
       const newPassword = await bcrypt.hash(password, 12);

       const setnewPassword = await User.findByIdAndUpdate({_id:id}, {password:newPassword});
        

       setnewPassword.save();

      res.status(201).json({status:201, setnewPassword})
    }else{
      res.status(401).json({status:401, message:"user not exist"})
    }

  }catch(error){
    res.status(401).json({status:401, error})
  }
})





  
 


module.exports = router;