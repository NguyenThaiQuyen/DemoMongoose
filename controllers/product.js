const { ObjectId } = require('mongodb');
const Product = require('../models/product.js');
const User = require('../models/user.js');

// get one product by id
getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const findingProduct = await Product.findById(ObjectId(productId))
        .populate('userId');

        return res.json({
            message: 'Info product',
            data: findingProduct['_doc']
        });
    } catch(err) {
        return next(err);
    }
};

// get list user
getListProduct= async (req, res, next) => {
    try {
        const dataProduct = await Product.find()
        .populate('userId');

        return res.json({
            message: 'List product with user',
            data: dataProduct
        });
    } catch(err) {
        return next(err);
    }
}

// create user
createProduct = async (req, res, next) => {
    try {
        const { name, userId, price, colors, isAvailable, payload } = req.body;

        const existedUser = await User.findById(ObjectId(userId));
        if (!existedUser) {
            return next(new Error('USER_NOT_FOUND'));
        };
        if (payload.expiredAt <= payload.releasedAt) {
            return next(new Error('DATE_INVALID'));
        }
        const result = await Product.create({
            name: name,
            userId: userId,
            price: price,
            colors: colors,
            isAvailable: isAvailable,
            payload: payload 
        });
        return res.json({
            message: 'Create new user successfully!',
            data: result
        });
    } catch(err) {
        return next(err);
    }
}

// delete product by id
deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const deletinguserById = await Product.findByIdAndDelete(ObjectId(productId));
        if (!deletinguserById) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        };
        return res.json({
            message: 'Delete product successfully!',
            data: deletinguserById
        });
    } catch(err) {
        return next(err);
    }
}

// update product price 

updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const price = req.body.price;
       
        const updatingUser = await Product.findByIdAndUpdate(ObjectId(productId),
        { $set : {price : price} });
        if (!updatingUser) {
                return next(new Error('PRODUCT_NOT_FOUND'));
        }
        return res.json({
            message: 'Update successfully!'
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getProduct: getProduct,
    getListProduct: getListProduct,
    createProduct : createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
};