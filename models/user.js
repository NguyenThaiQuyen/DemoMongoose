const { mongoose } = require('./index.js');

const user = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,  
        required: [true, 'username is required field!']
    },
    password: {
        type: String,
        trim: true,  
        required: [true, 'password is required field!']
    }
});

const User = mongoose.model('User', user);

module.exports = User;