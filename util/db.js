const { Sequelize } = require("sequelize");

const { DATABASE_URL, TEST_DATABASE_URL } = require("./config");
require("dotenv").config();

const { TESTING } = process.env;
const DATABASE = TESTING === "true" ? TEST_DATABASE_URL : DATABASE_URL;
const sequelize = new Sequelize(DATABASE, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    
    if (process.env.TESTING === "true") {
      await sequelize.sync({ alter: true }); 
      console.log("Database synchronized");
    } else {
      console.log("Connected to the database");
    }
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDatabase, sequelize };
