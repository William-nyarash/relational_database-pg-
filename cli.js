require('dotenv').config()
const express = require("express")
const { Sequelize,Model,DataTypes, QueryTypes } =  require('sequelize')

const app = express()
app.use(express.json())
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
})

class Blog extends Model {}
Blog.init({
 id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
 },
author: {
   type: DataTypes.TEXT,
   allowNull: true,
}, 
url: {
type: DataTypes.TEXT,
allowNull: false,
},
title: {
type: DataTypes.TEXT,
allowNull: false,
},
likes: {
type: DataTypes.INTEGER,
default: 0 }
}, {
sequelize,
underscored: true,
timestamps: false,
tableName:'blog',
modelName: 'blog'
})

app.get('/api/blogs', async (req, res ) => {
	const blogs = await Blog.findAll()
	console.log("the results", JSON.stringify(blogs))
	res.json(blogs)
})
app.post('/api/blogs', async(req, res) => {
	try{
		const blog = await Blog.create({...req.body})
		return res.json(blog)
	} catch (error) {
		console.error( error.message)
		res.status(400).json({ error })
	}
})

app.get('/api/blogs/:id', async ( req, res) => {
	try {
		const blog = await Blog.findByPk( req.params.id)

		if(!blog ) {
			res.status(404).end()
		}
		res.json(blog)
	} catch (error) {
		console.error(error.message)
	}
})
app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(!blog) {
	    res.status(404).json({error: 'blog not found'})
    }
	await blog.destroy()
	res.status(204).end()
})
const port = process.env.PORT || 3002

app.listen(port , () => {
console.log(`server is runing on port: ${port}`)
})

