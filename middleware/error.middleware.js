const { response } = require("express");

const errorHanlder = (error, request, response , next) => {

    console.log("Error: ", error)
    next(error)
}

module.exports = errorHanlder;