// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getInbox,searchUser,addConversation,sendMessage,getMessages } = require('../controllers/InboxController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {checkedLogin} = require('../middlewares/common/checkLogin');
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");


// Inbox page
router.get('/', decorateHtmlResponse('Inbox'),checkedLogin, getInbox);


// search user for conversation
router.post("/search", checkedLogin, searchUser);


// add conversation
router.post("/conversation", checkedLogin, addConversation);


// get messages of a conversation
router.get("/messages/:conversation_id", checkedLogin, getMessages);

// send message
router.post("/message", checkedLogin, attachmentUpload, sendMessage);


module.exports = router;
