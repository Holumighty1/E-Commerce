const express = require("express")
//const { validateAuth, loginValidation} = require("../validation/authVal")
//const { validateAuth, loginValidation} = require("../middlewares/authVal")
const { validateAuth: validationAuth, loginValidation: validationLogin } = require("../validation/authVal");
const { validateAuth: middlewareAuth, loginValidation: middlewareLogin } = require("../middlewares/authVal");

const { registerUser, UserLogin } = require("../controller/auth")

const authRoute = express.Router()