const express = require("express")
const { Blog, User } = require('./models')

const  app = express()

app.use(express.json())

const { connectToDatabase } = require("./util/db")
const { PORT } = require("./util/config")
 
const blogRouter = require("./controllers/blog.controller")
const userRouter = require("./controllers/user.controller")
const loginRouter = require("./controllers/login")
const statusRouter = require("./controllers/status.controller")
const authorRouter = require("./controllers/authors.controller")
const dbRouter = require("./controllers/db.controller")
const errorHanlder = require("./middleware/error.middleware")

app.get("/ws", (request, response) => {
  return response.status(200)
})
app.use("/api/blog",  blogRouter)
app.use("/api/users", userRouter)
app.use("/api/author", authorRouter)
app.use("/api/login", loginRouter)
app.use("/api/reset", dbRouter)
app.use('/', statusRouter)


app.use(errorHanlder)
const start = async () => {

await connectToDatabase()
console.log("Database connected and models ready.");
 
if(process.env.NODE_ENV !== 'production')
{

  await Blog.sync({alter: true})
  await User.sync({alter: true})
  console.log("set for dev and testing")
}
app.listen( PORT, () => {
  console.log(`Server running on port: ${PORT}`)  
})
}

start()
