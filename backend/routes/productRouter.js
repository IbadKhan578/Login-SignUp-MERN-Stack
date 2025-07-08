const ensureAuthenticated = require('../middlewares/auth');


const router = require('express').Router();



router.get('/',ensureAuthenticated,(req,res)=>{
    res.send(
        [{
            name:"realme 3",
            price:"10000"
        }])

})



module.exports= router;