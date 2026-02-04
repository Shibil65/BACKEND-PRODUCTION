const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

exports.register = async(req,res) => {
    const { name,email,password } = req.body;

    const nameExists = await User.findOne({name});
    if (nameExists) {
        return res.status(400).json({message: "User already exists"})
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        return res.status(400).json({message: "User already exists"})
    }

    const user = await User.create({ name,email,password })

    res.status(201).json({
        message:"User registered successfully"
    });
};

exports.login = async(req,res) => {
    const { email,password } = req.body;

    const user = await User.findOne({email});
    if(!email) {
        return res.status(404).json({message:"Invaid Email"})
    }

    const ismatch = await user.comparePassword(password);
    if(!ismatch){
        return res.status(403).json({message:"The password Incorrect!"})
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn:"1d" }
    );

    res.json({
        message:"Login successful",
        token
    })
}


