// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getUsers } = require('../controllers/userController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require('../middlewares/users/avatarUpload');


// User view page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user 
router.post("/", avatarUpload);


module.exports = router;
