const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const connectDb = require("./Db")
const authRoute = require("./route/authRoute")
const CategoryRoute = require("./route/prdtCatRoute")
const Route = require("./route/others")
const productRoute = require("./route/product")
const orderRoute = require("./route/order")
const adminValidation = require("./middlewares/admin")
const refresh = require("./route/refresh")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const PORT =process.env.PORT || 8090
connectDb()
async (params) => {
    app.use(express.json())
}
//app.use(cors())

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})

async (params) => {
    app.use(("/api/order"),orderRoute) 
    app.use(("/api/category"), CategoryRoute)
    app.use(("/api/other"), Route)
    app.use(("/api/product"),productRoute)
    app.use(("/api/auth"), authRoute )
    app.use(("/api/refresh"),refresh )
}


app.get(("/"), (req,res) =>{
    res.status(200).json({message:"welcome to e-commerce database"})
})
app.get(("/test-admin"),adminValidation, (req,res) =>{

})