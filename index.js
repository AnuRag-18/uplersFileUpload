const express = require('express');
const app = express();
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

app.post('/app/uploadFile', upload.single('productImage'), (req, res, next) => {


    let name = req.body.name,
        productImage = req.file.path, _id = req.body.id;


    res.status(201).json({
        message: 'file upload  successfully',
        fileUploadDetails: {
            name: name,
            _id: _id,
            productImage: productImage

        }
    });


});


app.get('/getStart', (req, res) => {
    res.send("Hello Server");
})


app.listen(3001, () => {
    console.log("Hello Node Js Application");
})