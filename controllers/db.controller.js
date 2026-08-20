const router = require('express').Router()
const { truncate } = require('../models/blogs')
const { sequelize } = require('../util/db')

router.route('/')
    .post(async (req, res, next) => {

        try {
            await sequelize.truncate({ cascade: true})
            return res.status(204).json()
        } catch (error) {

            next(error)
        }
    })

    module.exports = router