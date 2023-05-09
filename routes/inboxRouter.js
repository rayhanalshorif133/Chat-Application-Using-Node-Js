// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getInbox,searchUser,addConversation } = require('../controllers/InboxController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {checkedLogin} = require('../middlewares/common/checkLogin');


// Inbox page
router.get('/', decorateHtmlResponse('Inbox'),checkedLogin, getInbox);


// search user for conversation
router.post("/search", checkedLogin, searchUser);


// add conversation
router.post("/conversation", checkedLogin, addConversation);


module.exports = router;
