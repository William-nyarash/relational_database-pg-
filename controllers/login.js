const jwt = require('jsonwebtoken')
const router = require("express").Router()

const User = require("../models/user")
 const { SECRET } = require("../util/config")


router.post("/", async (req, res , next ) => {
    const dataBody = req.body
    try {
        console.log("the data is ", dataBody)
        const user = await User.findOne({
            where: {
                username: dataBody.username
            }
        })

        const password =  dataBody.password === 'secret'

        if(!(user && password )){
            return res.status(401).json({
                error: "invalid username or password"
            })
        }

        const userToBeToken = {
            username: user.username,
            id: user.id
        }
        const  token = await jwt.sign(userToBeToken, SECRET)

        res.status(201).json({
            token,
            username: user.username,
            name: user.name
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router
