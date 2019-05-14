const userController = require('../controllers/product');
const userValidations = require('../validations/product');
const validate = require('express-validation');

exports.load = (app) => {
	// get list product
	app.get('/api/v1/products', userController.getListProduct); 
	// get one product by id
	app.get('/api/v1/products/:id', validate(userValidations.checkProductId()), userController.getProduct); 
	// create new product
	app.post('/api/v1/products', validate(userValidations.createProduct()), userController.createProduct); 
	// delete one product by id
	app.delete('/api/v1/products/:id', validate(userValidations.checkProductId()), userController.deleteProduct);
	// update one product by id, change name 
	app.put('/api/v1/products/:id', validate(userValidations.updateProduct()), userController.updateProduct); 
}
