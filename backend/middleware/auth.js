import jwt from "jsonwebtoken";

const authUser = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false, message:"Not Autharized Login Again!"});
    }
    try {
        // verifies the token and extracts the userId
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
         // Attach userId to request body. It will help to logout
        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export default authUser
