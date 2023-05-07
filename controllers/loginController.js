// external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');


// internal imports
const User = require('../models/People');

// view login page
function getLogin(req, res, next) {
    res.render('index');
}


// do login
async function login(req, res, next) {
    try {
        // find a user who has this email/username
        const user = await User.findOne({
            $or: [{ email: req.body.username }, 
                { mobile: req.body.username }],
        });
        if(user && user._id){
            const isValidPassword = await bcrypt.compare(req.body.password, 
                user.password);
            if(isValidPassword){
                const userObject = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

                const jwtToken = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });


                // set cookie
                res.cookie(process.env.COOKIE_NAME, jwtToken, {
                    maxAge: process.env.COOKIE_EXPIRY,
                    httpOnly: true,
                    signed: true, // to check if the cookie is modified
                });

                res.locals.loggedInUser = userObject;
                res.render('inbox');
            }else{
               throw createError('Login failed! Please try again.');
            }
        }else{
            throw createError('Login failed! Please try again.');
        }
    } catch (error) {
        res.render('index',{
            data:{
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
}

module.exports = {
 getLogin,login
}