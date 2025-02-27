import jwt from "jsonwebtoken";

async function authProtect(req,res,next) {

    try {
        const token=req.cookies.token;
        
        

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        

        if(!decoded){
            res.status(401).json({success:false,message:"Not authorized"})
        }

        req.body.userId=decoded.id;

    
        

        next();
    } catch (error) {
        res.json({success:false,message:"Not authorized"})
    }
    
}

export default authProtect;