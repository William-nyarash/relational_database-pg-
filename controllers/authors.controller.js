const router = require("express").Router();
const { Op, fn, col } = require("sequelize");
const { Blog, User } = require('../models/index');

router.get('/', async (req, res, next) => {
    console.log("the data is supposed to be here");

    try {
        const authors = await User.findAll({
            attributes: [
                'name',
                'id',
                [fn('COUNT', col('blogs.id')), 'blogs'],
                [fn('SUM', col('blogs.likes')), 'likes']
            ],
            include: {
                model: Blog,
                attributes: [],
                required: true,
                as: 'blogs',
                duplicating: false
            },
            group: ['user.id'], 
            logging: console.log,
            raw: true
        });

        if (!authors || authors.length === 0) {
            return res.status(404).json({ error: "No resources found" });
        }

        const response = authors.map(user => {

            return {
                name: user.name,
                blogs: user.blogs,     
                likes: user.likes     
            };
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in route:", error);
        next(error);
    }
});

module.exports = router;


module.exports = router