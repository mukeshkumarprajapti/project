const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    referral_id: {
        type:String,
    },
    userId: {
         type: Number,
         required: true,
          unique: true 
        },
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conform_password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }

    ],
    verifiTokan: {
        type: String
        
    },
    
    balance:{
        type: Number,
        default:0,
        required:true
    },

    number_of_refficients: {
        type: Number,
        default: 0

    }
    
})

// **we are hashing the password

userSchema.pre('save', async function (next) {
     console.log("hi from inside")
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.conform_password = await bcrypt.hash(this.conform_password, 12);
    }
    next();
});

// we are generating token

userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){[
        console.log(err)
    ]}
}


const User = mongoose.model('USER', userSchema);

module.exports = User;