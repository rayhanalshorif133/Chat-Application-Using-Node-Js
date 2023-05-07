const {check,validationResult} = require('express-validator');

const loginValidators = [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 1 })
        .withMessage('Mobile number or email is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 1 })
        .withMessage('Password must be at least 8 characters long'),
];

const doLoginValidationHandler = (req, res, next) => {
    const validationErrors = validationResult(req);
    const mappedErrors = validationErrors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        res.render('index',{
            data:{
                username: req.body.username,
            },
            errors: mappedErrors,
        });
    }
};



module.exports = {
    loginValidators,doLoginValidationHandler
};