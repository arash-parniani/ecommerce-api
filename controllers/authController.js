const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req , res) => {
    const {name, email, password} = req.body
    try {
        const exist = await User.findOne({ email })
        if(exist) {
            return res.status(500).json({ message: 'کار بر از قبل ثبت نام کرده است' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password: hashedPassword})

        res.status(201).json({user})

    } catch (err) {
        res.status(500).json({ messsage: err.message })

    }
}
const login = async (req, res) => {
    const {email , password} = req.body
    try {
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({ message: 'نام کاربر یا رمز عبور اشتباه است' })

        const match = await bcrypt.compare(password , user.password)
        if(!match) return res.status(400).json({ message: 'نام کاربری یا رمز عبور اشتباه است' })

        const token = jwt.sign(
            {userId: user._id, isAdmin: user.isAdmin,},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({ token, user: { name: user.name , eamil: user.email } })
    } catch(err) {
        res.status(500).json({message: `Eroro From ${err}`})
    }
}

module.exports = {
    register,
    login
}