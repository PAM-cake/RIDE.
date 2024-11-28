const express = require('express')
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controllers/user.controller')


router.post("/register",[
    body('email').isEmail().withMessage('Ivalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage("First name must be at least 3 char long"),
    body('password').isLength({ min: 6}).withMessage("Password must be at least 6 char long")
],
    userController.registerUser
)


module.exports = router;