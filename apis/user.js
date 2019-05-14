const userController = require('../controllers/user');
const userValidations = require('../validations/user');
const validate = require('express-validation');

exports.load = (app) => {
	// get list user
	app.get('/api/v1/users', userController.getListUser);
	// get one user by id
	app.get('/api/v1/users/:id', validate(userValidations.checkUserId()), userController.getUser); 
	// create new one user
	app.post('/api/v1/users', validate(userValidations.createUser()), userController.createUser);
	// delete one user by id 
	app.delete('/api/v1/users/:id', validate(userValidations.checkUserId()), userController.deleteUser);
	// update one user by id 
	app.put('/api/v1/users/:id', validate(userValidations.updateUser()), userController.updateUser); 
};