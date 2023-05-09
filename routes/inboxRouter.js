// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getInbox,searchUser } = require('../controllers/InboxController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {checkedLogin} = require('../middlewares/common/checkLogin');


// Inbox page
router.get('/', decorateHtmlResponse('Inbox'),checkedLogin, getInbox);


// search user for conversation
router.post("/search", checkedLogin, searchUser);


module.exports = router;
