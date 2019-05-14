const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./apis/user');
const productRoute = require('./apis/product');
const models = require('./models');
const port = 3000;

app.use(bodyParser.json({ type: 'application/json' }));

// connect server
models
.connectDB()
.then(console.log('Connect server successfully!'))
.catch((err) => {
    console.err(err);
    process.exit(1);
});

// load apis
userRoute.load(app);
productRoute.load(app);

app.use((err, req, res, next) => {
    if (Array.isArray(err.errors)) {
        const messages = err.errors.map(item => {
            return item.messages;
        });

        return res.status(400).json({
            errors: messages
        });
    }
    return res.status(400).json({
        messages: err.message
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

