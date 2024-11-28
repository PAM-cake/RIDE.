const express = require('express')
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controllers/user.controller')

//register route
router.post("/register",[
    body('email').isEmail().withMessage('Ivalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage("First name must be at least 3 char long"),
    body('password').isLength({ min: 6}).withMessage("Password must be at least 6 char long")
],
    userController.registerUser
)

//login route
router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6}).withMessage("Password must be at least 6 char long")
],
//we will need controller now //
userController.loginUser
)


module.exports = router;