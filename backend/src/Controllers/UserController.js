const Jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const Product = require("../Models/productSchema");
const jwtKey = process.env.JWTKEY;

module.exports = {
    userLogin(req, res) {
        if (req.body.password && req.body.email) {
            User
            .findOne(req.body)
            .select("-password")
            .then((user) => {
                if (user) { 
                    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                      if (err) {
                        res.send({
                          result: "something went wrong, Please try after sometime"
                        });
                      }
                      res.send({ user , auth: token });
                    });
                  } else {
                    res.send({ result: "No user found" });
                  }
            })
            .catch(error => console.log('Login error',error))
          } else {
            res.send({ result: "No user found " });
          }
    },
    userRegister(req,res) {
        let user = new User(req.body);
        user
            .save()
            .then((result) => {
                result = result.toObject();
                delete result.password;
                Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                  if (err) {
                    res.send({
                      result: "something went wrong, Please try after sometime"
                    });
                  }
                  res.send({ result , auth: token });
                });
            })
            .catch(error => console.log("error",error))

    },
     addProduct(req, res) {
        let product = new Product(req.body);    ///////
        product
            .save()
            .then((result) => {
                res.send(result)
            })
        
    },
    getAllProduct(req, res) {
        Product
            .find({ userId: req.params.id })
            .then((products) => {
                if (products) {
                    res.send(products);
                  } else {
                    res.send({ result: "No product found" });
                  }
            })
            .catch(error => console.log('error',error))
    },
    deleteProduct(req,res) {
        Product
            .deleteOne({ _id: req.params.id })
            .then((result) => {
                res.send(result)
            })
            .catch(error => console.log('error',error))
    },
    getOneProduct(req,res) {
        Product
            .findOne({ _id: req.params.id })
            .then((result) => {
                if (result) {
                    res.send(result);
                  } else {
                    res.send({ result: "No record found" });
                  }
            })
            .catch(error => console.log('error',error))
    },
    updateProduct(req,res) {
        Product
            .updateOne(
                { _id: req.params.id },
                { $set: req.body }
            )
            .then((result) => {
                res.send(result)
            })
            .catch(error => console.log('error',error))
    },
    productSearch(req,res) {
        Product
            .find({
                $or: [
                { name: { $regex: req.params.key, $options: "i" } },
                { company: { $regex: req.params.key, $options: "i" } },
                { category: { $regex: req.params.key, $options: "i" } },
                ],
            })
            .then((result) => {
                res.send(result)
            })
            .catch(error => console.log('error',error))
    },
    updateImage(req,res) {
        console.log(req.file,req.body);
        const imageUrl = req.file?.path
        if (!imageUrl) {
          res.status(400).send({message:"Bad request"})
        }
        User
            .updateOne(
            { _id: req.body.userId },
            { $set: {imageUrl} }         
            )
            .then(() => {

                if (imageUrl) {
                    res.send({imageUrl})
                  }
            })
    },
    getUserData(req,res) {
        User
            .find({ _id: req.params.id })
            .then((userData) => {
                if (userData) {
                    res.status(200).send(userData);
                  } else {
                    res.status(400).send({ result: "No user Found" });
                  }
            })
            .catch(error => console.log('error',error))
    }

}