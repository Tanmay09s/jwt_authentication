const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");

const app = express();
app.use(express.json());
dotenv.config();

//conecting to mongo DB
connectDB();

app.use(
  cors({
    origin: "https://your-project.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth",authRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})


