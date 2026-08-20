const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")
const{ Op } = require("sequelize")
const router = require("express").Router();
const { Blog, User } = require("../models/index");
const { sequelize } = require("../util/db");

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);

    if (!req.blog) {
      return res.status(404).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};

const tokenExtractor = async ( req, res, next ) => {
    const authorization = req.get('authorization')
    console.log("The authorization is", authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.route('/')
     .post(tokenExtractor, async (req, res, next ) => {
        try {
            const user = await User.findByPk(req.decodedToken.id)
            console.log("the user is ", user)
            const blog = await Blog.create({
                ...req.body,
                user_id: user.id,
                date: new Date(),
            })
            res.json(blog)
        } catch (error) {
            next(error)
        }
     })
     .get(async ( req, res, next) =>  {
        const where = {}
        
        try {
           if(req.query.title){
             blogContent = req.query.title === 'react'
           }
           if (req.query.search) {
            where.title = {
            [Op.substring]: req.query.search
            }}
            if(req.query.search){
              blogAuthor = req.query.author === "your\'s truly"
            }
            const blogs = await Blog.findAll({
                attributes: {exclude: ['userId']},
                include: {
                    model: User,
                    attributes: ['name']
                },
                where,
                order: [
                  ['likes', 'DESC']
                ]
            })
            res.json(blogs)
        } catch (error) {
            next(error)
        }
     })

router
  .route("/:id")
  .all(blogFinder)
  .get((req, res) => {
    res.json(req.blog);
  })
  .put(async (req, res, next) => {
    let blog = req.body
    try {
      blog.likes= blog.likes;
      await blog.save();

      res.json(blog);
    } catch (error) {
      next(error);

    }
  })
  .delete(async (req, res, next) => {
    try {
      await req.blog.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
