import jwt from 'jsonwebtoken'

//admin authentication middlewares
const authAdmin = async (req,res,next) =>{

    const {atoken} = req.headers

    if(!atoken) {
        return res.json({success:false,message:'Not Authorized Login Again'})
    }

    try {
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.role !== 'admin'){
            return res.json({success:false,message:'Not Authorized Login Again'})
        }

        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authAdmin;