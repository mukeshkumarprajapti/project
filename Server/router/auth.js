const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring")
const authenticate = require('../middleware/authenticate');


require("../db/conn");
const User = require("../model/userSchema");
const Transaction = require('../model/TransactionSchema');

 const transporter = require("../emailSend/transporter");

 const stripe = require("stripe")(process.env.STRIPE_KEY);
 const uuid = require("uuidV4");

//  homepage route
 router.get('/', authenticate , (req, res) => {
  console.log(`hello my about`);
  res.send(req.rootUser);
});

  // registration route

 router.post("/register", async (req, res) => {
    
  
    try {
      const { referral_id, firstname, lastname, email, phone, password, conform_password  } = req.body;
  
    if ( !firstname || !lastname || !email || !phone || !password|| !conform_password ) {
      return res.status(400).json({ message: "plz filled the field property" });
    }
 
    let startingUserId = 1006090;
    let isUnique = false;
      while (!isUnique) {
        const existingUser = await User.findOne({ userId: startingUserId }).lean();
  
        if (!existingUser) {
          isUnique = true;
        } else {
          startingUserId++;
        }
      }
      const userExist = await User.findOne({ email: email });
      const referredBy = await User.findOne({ userId: referral_id})
       
      if (userExist) {
        return res.status(400).json({ message: "Email already Exist" });
      } else if (password != conform_password) {
        return res.status(400).json({ message: "password are not matching" });
      } else {
        const user = new User({ referral_id,    userId: startingUserId, firstname, lastname, email, phone,  password, conform_password  });
  
        referredBy.balance += 20;
        referredBy.number_of_refficients += 1;
        user.balance += 30;


        await referredBy.save();
        await user.save();  

        // const info = await transporter.sendMail({
        //   from:'prajaptimukesh770@gmail.com', 
        //   to:email,
        //   subject: "sending Email for password reset",
        //   text: `your user Id is ${startingUserId}`
        // })

        // console.log("Message sent: %s", info.messageId);
  
        res.status(201).json({ message: "user registered successfuly" });
      
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: "Server error" });
    }
  });
 

    //  login route

  router.post("/login", async (req, res) => {
    try {
      const { userId, password } = req.body;
  
      if (!userId || !password) {
        return res.status(400).json({ message: "plz filled the data" });
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
          res.status(400).json({ message: "Invalid Credientials" });
        } else {
          res.json({ message: " Login Successfully" });
        }
      } else {
        res.status(400).json({ message: "Invalid Credientials" });
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

// Update password route


router.put('/updatepassword', authenticate, async (req, res) => {
  const { currentpassword, newpassword } = req.body;
  const userId = req.user._id
 console.log(userId)
  
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(currentpassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newpassword, 12);
    
    const setnewPassword = await User.findByIdAndUpdate({_id:userId}, {password:hashedNewPassword});
        

       setnewPassword.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// for get user data
router.get('/getdata', authenticate , (req, res) => {
  console.log(`hello my contact`);
  res.send(req.rootUser);
});

// for get all users data

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/transaction', async (req, res) => {
  try {
    const users = await Transaction.find();
    res.json(users);
   console.log(users)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//for moneytransfer

router.post("/transferMoney",authenticate, async(req, res) => {
  
  const {  receiverId, amount:amountStr } = req.body;
  const amount = Number(amountStr);
  const senderId = req.user.userId
console.log(senderId, receiverId, amount)
// return res.status(201).json({ massage: "transaction successfuly" });


try {
  const sender = await User.findOne({userId:senderId});
  const receiver = await User.findOne({userId:receiverId});

  if (!sender || !receiver) {
    res.status(400).json({ message: 'User not found' });
    return;
  }
  

   if (sender.balance < amount) {
    res.status(400).json({ message: 'Insufficient balance' });
    return;
  }

  if (sender.userId == receiver.userId) {
    res.status(400).json({ message:'sender and receiver are same'})
    return;
  }

  sender.balance -= amount;
  receiver.balance += amount;

  const transaction = new Transaction({
    sender: sender._id,
    receiver: receiver._id,
    senderUserId: sender.userId, // Store sender's userId
    receiverUserId: receiver.userId,
    amount,
  });

  await sender.save();
  await receiver.save();
  await transaction.save();
  res.status(201).json({ message: "transaction successfuly" });
  
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Server error' });
}
});


// for add money

router.post("/AddMoney", async(req, res) => {

  try {
    const {token, amount} = req.body;

    const customer = await stripe.customer.create({
      email: token.email,
      source: token.id
    });

    //create a charge

    const charge = await stripe.charge.create({
      amount:amount,
      currency:"usd",
      customer: customer.id,
      receipt_email: token.email,
      description:" Deposite to Sheywallet"
    },
    {
      idempotencyKey: uuid()
    })
    
    res.status(200).json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
})
  
 


module.exports = router;