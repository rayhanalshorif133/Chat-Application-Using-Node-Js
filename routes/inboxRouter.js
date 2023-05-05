// external imports
const express = require('express');

const router = express.Router();

// internal imports
const { getInbox } = require('../controllers/InboxController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");


// Inbox page
router.get('/', decorateHtmlResponse('Inbox'), getInbox);

module.exports = router;
