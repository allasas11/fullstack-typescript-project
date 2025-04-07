const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const process = require('process')

const User = require('../models/userModel')


const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password ) {
        res.status(400).send({ message: 'All fields are required'})
    }

    const existingUser = await User.findOne({ email })
    if(existingUser) {
        res.status(400).send({ message: 'Email already exists'})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })



        await newUser.save()


        res.send({
            message: 'User registered successfully',
            user: req.body
          })

    } catch (error) {
        res.status(500).send(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    if (!email || !password ) {
        res.status(400).send({ message: 'Invalid email or password'})
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).send({ message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).send({ message: 'Invalid email or password'})
        }

        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username,
                email: user.email,
                password: user.password
            },
            process.env.JWT_SECRET,
        )

        console.log(token)
        res.status(200).send({
            message: 'User successfully logged in',
            token: token
        })

    } catch (error) {
        res.status(500).send(error)
    } 
}

module.exports = {
    register,
    login
}