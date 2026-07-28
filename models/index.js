const  Blog   = require('./blogs')
const User = require("./user")


User.hasMany(Blog, { foreignKey: 'user_id' });
Blog.belongsTo(User, { foreignKey: 'user_id' });

const syncDatabse = async () => {
try{

  await Blog.sync({ alter: true})
  await User.sync({ alter: true})
} catch (error) {
  console.error("error: ", error.message)
}
}

syncDatabse()

module.exports = {
  Blog, User
}
