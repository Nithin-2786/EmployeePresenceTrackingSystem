const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const User= require("../models/usermodel")
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("ALL FIELDS ARE MANDOTORY");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashPassword);

    const user = await User.create({
        username,
        email,
        password: hashPassword
    });
    
    if (user) {
        return res.status(201).json({
            _id: user.id,
            email: user.email,
            message: "User registered successfully"
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const login = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {username,password}=req.body;
    const user =await User.findOne({username})
    if(user || (await bcrypt.compare(password,user.password))){
        const accesstoken=jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
                type:user.userType,
            }
        },
        process.env.ACCESSTOKENSECRET,
        {
            expiresIn:"15m"
        })

        res.json({accesstoken})
    }
    else 
    {
        res.json({message:"invalid username or password"})
    }
})

module.exports = { register, login };
