// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getUsers } = require('../controllers/userController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");


// User page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
