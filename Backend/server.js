const authroutes =require('./routes/Authroutes');
const ExpenseRoutes = require('./routes/Expenseroutes')
const express = require('express');
const mongoose =require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authroutes)
app.use("/api/expense",ExpenseRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDb Connected"))
.catch(err=>console.log('err'));

app.get('/',(req,res)=>{
    res.send("Api Running")
})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})