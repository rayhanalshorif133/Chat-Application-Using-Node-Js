// external imports
const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

// internal imports
const { getUsers,addUser,deleteUser } = require('../controllers/userController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidators,addUserValidationHandler } = require('../middlewares/users/userValidators');
const {checkedLogin, requireRole} = require('../middlewares/common/checkLogin');

// User view page
router.get(
    "/",
    decorateHtmlResponse("Users"),
    checkedLogin,
    requireRole(["admin"]),
    getUsers
  );

// add user 
router.post("/", 
checkedLogin,
requireRole(['admin']),
avatarUpload, 
addUserValidators,
addUserValidationHandler,
addUser);

// update user

// delete user
router.delete("/:id", deleteUser);

 
module.exports = router;
