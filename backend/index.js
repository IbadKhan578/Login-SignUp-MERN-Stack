const express = require('express');
require('dotenv').config();
require('./models/db')
const authRouter = require('./routes/AuthRouter.js')
const productRouter = require('./routes/productRouter.js')

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;

// app.get('/ping',(req,res)=>{
//     res.send("pong");
// })

app.use('/auth',authRouter);
app.use('/products',productRouter);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})