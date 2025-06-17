const mongoose = require("mongoose")

const productCategory = new mongoose.Schema({
    categoryName:{type:String},
    description:{type:String}
})

const Category = new mongoose.model(("Category"), productCategory)

module.exports = Category