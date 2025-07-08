const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CON;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("mongo db connected")
}).catch((err)=>{
    console.log("Mongo db conected error",err);
})