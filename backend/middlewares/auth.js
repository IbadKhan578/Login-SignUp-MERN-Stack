const jwt = require("jsonwebtoken")

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json(
            { 
                message:"UnAuthorized,  jwt token is required"

            })
    }

    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
         return res.status(404)
        .json(
            { 
                message:"UnAuthorized,  jwt token is wrong or expired"

            })
        
    }
}

module.exports = ensureAuthenticated;