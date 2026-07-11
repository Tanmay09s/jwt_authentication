const express = require('express');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = async(req,res)=>{

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user
        });

        console.log(user)
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const login = async(req,res) =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success : false,
                message:"User not found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "10h"
            }
        )

         res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const profile = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");

        return res.status(200).json({
            success:true,
            user
        })
    }catch(error){
         res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const logout = (req,res) =>{
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
}

module.exports = {register,login,profile,logout};