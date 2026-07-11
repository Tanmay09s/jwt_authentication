const mongoose = require('mongoose');
const express = require("express");
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected sucessfully");
    }
    catch(error){
         console.log("Database Connection Failed");
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;