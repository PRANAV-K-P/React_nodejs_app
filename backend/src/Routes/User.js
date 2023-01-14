const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Controller = require('../Controllers/UserController')
const Jwt = require('../Middlewares/Jwt')

router
    .post('/login',Controller.userLogin)
    .post('/register',Controller.userRegister)
    .post('/product',Jwt.verifyToken,Controller.addProduct)
    .get("/products/:id",Jwt.verifyToken,Controller.getAllProduct)
    .get("/search/:key",Jwt.verifyToken,Controller.productSearch)
    .put("/image",Jwt.verifyToken,upload.single('image'),Controller.updateImage)
    .get("/user/:id",Jwt.verifyToken,Controller.getUserData)

    .route('/product/:id')
        .delete(Jwt.verifyToken,Controller.deleteProduct)
        .get(Jwt.verifyToken,Controller.getOneProduct)
        .put(Jwt.verifyToken,Controller.updateProduct)

module.exports = router;