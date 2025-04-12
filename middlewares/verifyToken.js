const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(401).json({ message: 'توکن حمایت نشده است' })
    
        const token = authHeader.split(' ')[1]
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        

        next()
    } catch (err) {
        res.status(403).json({message:  err.message})
    }
}



module.exports = verifyToken