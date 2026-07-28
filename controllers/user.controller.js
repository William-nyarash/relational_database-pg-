const router = require("express").Router()
const { User, Blog } = require("../models/index")

const getByUsername = async (req, res, next ) => {
    try {
        const username = req.params.username
        const user = await User.findOne({
            where: {
                username: username
            }
        })
      
        if (!user) {
            return res.status(404).end()
        }
        req.user = user
        next()
    } catch( error ) {
        next(error)
    }
}


router.get('/',async (req, res , next)=> {
        try{
            const users = await User.findAll({
                include: {
                    model: Blog
                }
            })

            res.json(users)
        } catch (error) {
            next(error)
        }
    })
router.post('/',async ( req , res, nex) => {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch(error) {
            return res.status(400).json({ error })
        }
    })

router.route('/:username')
    .all(getByUsername)
    .put( async (req, res, next) => {
        try{
            if(user.id !== req.user.id) {        
                return res.status(403).json({error: "forbiden"})
            }
            await req.user.save()
            res.json(req.user)
        } catch( error ) {
            next(error)
        }
    })
    .delete( async (req, res, next) => {
        const user = req.user
        try{
            console.log("the blog is", user)
            if(user.id !== user.id) {
                return res.status(402).json({error: "forbiden"})
            }
            if(!user.id){
                res.status(404).json({error: "User not found"})
            }
            const blog = await Blog.findOne({
                where: {
                    user_id: user.id
                }
            })
            if(!blog) {
               return res.status(404).json({ error: "The user doesn't have a blog yet"})
            }
            blog.destroy()
            res.status(204).end()
        } catch( error) {
            next(error)
        }
    })
   
module.exports = router;