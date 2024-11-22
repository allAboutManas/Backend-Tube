import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userSchema= new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true     //index is use to make any field searchable in optimazable way  although it make the searching expensive 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    },





},{timestamps:true})




userSchema.pre("save", async function (next) {    
                  // it will hit when the "Save" functionality get called

    if(!this.isModified("password")) return next();  //if any data will update also password fill will update .to prevent this we are making a if condition which check is password modified or not if not modified directy call the next middleware 


    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)  /// it compare the password with the new one . Compare will return the value in boolean
}

userSchema.methods.generateAccessToken=function(){
   return jwt.sign({    //.sign is method in JWT  which generates token

    ///payloads
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName

    },process.env.ACCESS_TOKEN_SECRET, //second thing .sign method is need is access token
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY  //third thing it needs is expriy token in object
    }
)
}
userSchema.methods.generateRefreshToken=function(){

    return jwt.sign({    //.sign is method in JWT  which generates token

        ///payloads
            _id:this._id
            
        },process.env.REFRESH_TOKEN_SECRET, //second thing .sign method is need is access token
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY  //third thing it needs is expriy token in object
        }
    )
}



// There is no more difference between refresh token and access token one is short lived and one is long lived 

//generally access token is used for short period of time and refresh token is long lived .


export const User = mongoose.model("User", userSchema)