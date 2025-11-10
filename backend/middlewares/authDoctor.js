import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const {dtoken} = req.headers

        if (!dtoken) {
            return res.json({success: false, message: 'Unauthorized: No token provided'})
        }

        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.docId = decoded.id  

        next()
    } catch (error) {
        console.log(error)
        if (error.message === 'jwt expired') {
            return res.json({success: false, message: 'Token expired'})
        }
        res.json({success: false, message: 'Invalid token'})
    }
}

export default authDoctor
