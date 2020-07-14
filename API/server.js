const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./DB');
const multer = require('multer');

const productRoute = require('./routes/product.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use('/products', productRoute);
const port = process.env.PORT || 4000;

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});

const port2 = process.env.PORT || 3000;
const server2 = app.listen(port2, function() {
    console.log('Listening on port ' + port2);
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './../src/assets/uploads') //uploads
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file);
})