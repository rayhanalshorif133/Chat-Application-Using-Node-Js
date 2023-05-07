// external imports

const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// internal imports
const User = require('../models/People');



// view user page
async function getUsers(req, res, next) {

	try {
		const users = await User.find();
		res.render('users', { users: users });
	} catch (error) {
		next(error);
	}

}

async function addUser(req, res, next) {
	let newUser;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	if (req.files && req.files.length > 0) {
		newUser = new User({
			...req.body,
			avatar: req.files[0].filename,
			password: hashedPassword,
		});
	}else{
		newUser = new User({
			...req.body,
			password: hashedPassword,
		});
	}

	try {
		const result = await newUser.save();
		res.status(200).json({
			message: "User created successfully",
		});
	} catch (error) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Unknown error occurred!",
				},
			},
		});
	}
}


async function updateUser(req, res, next) {};

async function deleteUser(req, res, next) {
	try {

		const user = await User.findByIdAndDelete({
			_id: req.params.id,
		});

		// remove avatar from uploads folder
		if (user.avatar) {
			fs.unlink(
				path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
				(err) => {
					if (err) console.log(err);
				}
			);
		}

		res.status(200).json({
			message: "User deleted successfully",
		});
		
	} catch (error) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Unknown error occurred!",
				},
			},
		});
	}
};

module.exports = {
	getUsers,
	addUser,
	updateUser,
	deleteUser,
};
