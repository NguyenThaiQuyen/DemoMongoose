const { mongoose } = require('./index.js');

const product = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,  
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    colors: [
        {
            type: String,
            required: true
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true
    },
    payload: {
        expiredAt: {
            type: Date,
            required: true
        },
        releasedAt: {
            type: Date,
            required: true
        }
    }
});

const Product = mongoose.model('Product', product);

module.exports = Product;
