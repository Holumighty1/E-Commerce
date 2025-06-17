const User = require("../models/authModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerUser = async (req, res) => {
    try {
        const { Name, Email, Password, State, PhoneNumber, Role } = req.body;

        if (!Name || !Email || !Password || !PhoneNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(Password, 12);

        const newUser = new User({
            Name,
            Email,
            Password: hashedPassword,
            State,
            PhoneNumber,
            Role,
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser._id,
                Name: newUser.Name,
                Email: newUser.Email,
                Role: newUser.Role,
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const UserLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const Token = jwt.sign(
            { id: user._id, Name: user.Name },
            process.env.ACCESS_TOKEN,
            { expiresIn: "5h" }
        );

        const refreshToken = jwt.sign(
            { id: user._id, Name: user.Name },
            process.env.REFRESH_TOKEN,
            { expiresIn: "30d" }
        );

        res.status(200).json({
            message: "Login successful",
            Token,
            user,
            refreshToken,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {registerUser,UserLogin}