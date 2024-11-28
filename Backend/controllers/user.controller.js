const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')


//register controller//
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

//login controller//
module.exports.loginUser =  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password"); //to check the email entered exist or not //
    if(!user){
        return res.status(401).json({ message: 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password)  //to check that password matched or not //
    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();
    res.status(200).json({token,user})
}