
import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers

        if (!token) {
            return res.json({success: false, message: 'Unauthorized: No token provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id  

        next()
    } catch (error) {
        console.log(error)
        if (error.message === 'jwt expired') {
            return res.json({success: false, message: 'Token expired'})
        }
        res.json({success: false, message: 'Invalid token'})
    }
}

export default authUser
