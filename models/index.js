const  Blog   = require('./blogs')
const User = require("./user")


User.hasMany(Blog, { foreignKey: 'user_id' });
Blog.belongsTo(User, { foreignKey: 'user_id' });


module.exports = {
  Blog, User
}
