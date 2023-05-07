// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getLogin,login } = require('../controllers/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {loginValidators, doLoginValidationHandler} = require('../middlewares/login/loginValidators');


// page title
const pageTitle = 'Login';

// login page
router.get('/', decorateHtmlResponse(pageTitle), getLogin);

// login action
router.post('/',decorateHtmlResponse(pageTitle),loginValidators,doLoginValidationHandler, login);


module.exports = router;