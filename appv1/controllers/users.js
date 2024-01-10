const userModel = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const generateToken = (userId) => {
    // You can customize the token payload as per your requirements
    const payload = {
        userId,
    };

    const options = {
        expiresIn: '1h', // Token expiration time
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

exports.signup = async (req, res,next) => {    
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { firstName, lastName, email, password, age } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
        // return res.json({
        //     firstName,
        //     lastName,
        //     email,
        //     password: hashedPassword,
        //     age
        // });

        // Create a new user
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}
exports.login = async (req, res,next) => {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        } 
        // Generate a JWT token
        const token = generateToken(user._id);

        // Send the token in the response
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        next(error);
    }

} 
exports.getUser = async (req, res,next) => {
     // Validate user input using express-validator
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    // Implementation for update route
    
    try {
        const authenticatedUser = req.user;
        res.status(200).json({ message: 'Success', user: authenticatedUser });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
     // Validate user input using express-validator
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    try {
        // Access the authenticated user information from req.user
        const authenticatedUser = req.user;

        // Find the user in the database by ID and delete it
        const deletedUser = await userModel.findByIdAndDelete(authenticatedUser._id);

        // Check if the user exists
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        next(error);
    }
};
         
exports.updateUserProfile = async (req, res,next) => {
     // Validate user input using express-validator
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    
    try {
        // Access the authenticated user information from req.user
        const authenticatedUser = req.user;

        // Extract the fields to update from the request body
        const { firstName, lastName, age } = req.body;

        // Create an update object with non-empty fields
        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (age) updateFields.age = age;

        // Update the user in the database and get the updated document
        const updatedUser = await userModel.findByIdAndUpdate(
            authenticatedUser._id,
            updateFields,
            { new: true, runValidators: true }
        );

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
};
