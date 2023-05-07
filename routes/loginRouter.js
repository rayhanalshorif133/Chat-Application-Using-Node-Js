// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getLogin,login,logout } = require('../controllers/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {loginValidators, doLoginValidationHandler} = require('../middlewares/login/loginValidators');
const {redirectLoggedIn} = require('../middlewares/common/checkLogin');


// page title
const pageTitle = 'Login';

// login page
router.get('/', decorateHtmlResponse(pageTitle),redirectLoggedIn, getLogin);

// login action
router.post('/',decorateHtmlResponse(pageTitle),loginValidators,doLoginValidationHandler, login);

// logout
router.delete('/',logout);

module.exports = router;