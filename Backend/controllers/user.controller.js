const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    const { fullname, email, password } = req.body;

    // Create a new user instance
    const user = new userModel({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password
    });

    // Now call the hashPassword method on the user instance
    const hashedPassword = await user.hashPassword(password);

    // Save the hashed password
    user.password = hashedPassword;

    // Create the user in the database
    const newUser = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = newUser.generateAuthToken();

    res.status(201).json({ token, user: newUser });
}