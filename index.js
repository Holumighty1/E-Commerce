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


app.get(("/e-commerce"), (req,res) =>{
    res.status(200).json({message:"welcome to e-commerce database"})
})
app.get(("/test-admin"),adminValidation, (req,res) =>{

})

/*app.post("/login-user", async (req, res) => {
    try {

        const {email, firstName, lastName, state, password } = req.body;

    if (!email) {
        res.status(400).json({ message: "Please add your email" });
    }
    if (!password) {
        res.status(400).json({ message: "Please enter your password" });
    }
    
    const existinguser = await Auth.findOne({ email });
    if (existinguser) {
        return res.status(400).json({ message: "User account already exist" });
    }

    if(password.length < 6) {
       return res.status(400).json({ message: "Password must be a minimum of 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({
        email,
        firstName,
        lastName,
        state,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ 
        message: "User registered successfully", 
        newuser: {email, firstName, lastName, state}
    })

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});*/