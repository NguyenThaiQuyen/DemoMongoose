const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// get one product by id
exports.checkProductId = () => {
    return {
        params: {
            _id: Joi.objectId()
        }
    }
};

// create new  product
exports.createProduct = () => {
    return {
        body: {
            name: Joi.string().required(),
            userId: Joi.objectId().required(),
            price: Joi.number().required(),
	        colors: Joi.array().items(Joi.string().required()),
	        isAvailable: Joi.boolean().default(true),
	        payload: Joi.object({
                releasedAt: Joi.date().iso().required(),
		        expiredAt: Joi.date().iso().greater(Joi.ref('releasedAt')).required()
	        }).required()
        }
    }
};

// update price product
exports.updateProduct = () => {
    return {
        body: {
            price: Joi.number().required()
        },
        params: {
            _id: Joi.objectId()
        }
    }
};
