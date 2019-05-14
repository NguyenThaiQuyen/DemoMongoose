const { ObjectId } = require('mongodb');
const User = require('../models/user.js');

// get one user
getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const findingUser = await User.findById(ObjectId(userId));
        if (!findingUser) {
            return next(new Error('USER_NOT_FOUND'));
        }
        return res.json({
            message: 'Information of user',
            data: findingUser
        });
    } catch(err) {
        return next(err);
    }
};

// get list user
getListUser = async (req, res, next) => {
    try {
        const findingUsers = await User.find();

        if (!findingUsers) {
            return next(new Error('LIST_EMPTY'));
        }
        return res.json({
            message: 'List user',
            data: findingUsers
        });
    } catch(err) {
        return next(err);
    }
}
// create user
createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const findingUserByName = await User.findOne({
            username: username
        });
        if (findingUserByName) {
            return next(new Error('USERNAME_EXISTED'));
        };
        const newUser = await User.create({
            username: username,
            password: password
        });
        return res.json({
            message: 'Create new user successfully!',
            data: newUser
        });
    } catch(err) {
        return next(err);
    }
}
// delete user
deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
       
        const deletinguserById = await User.findByIdAndDelete(ObjectId(userId));
        if (!deletinguserById) {
            return next(new Error('USER_NOT_FOUND'));
        };
        return res.json({
            message: 'Delete user successfully!',
            data: deletinguserById
        });
    } catch(err) {
        return next(err);
    }
}

// update user username

updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { username } = req.body;

        const findingUserByName = await User.findOne({
            username: username
        });
        if (findingUserByName) {
            return next(new Error('USERNAME_EXISTED'));
        };
        const updatingUser = await User.findByIdAndUpdate(ObjectId(userId),
        { $set : {username: username} });
        if (!updatingUser) {
                return next(new Error('USER_NOT_FOUND'));
        }
        return res.json({
            message: 'Update successfully!'
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getUser: getUser,
    getListUser: getListUser,
    createUser : createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};