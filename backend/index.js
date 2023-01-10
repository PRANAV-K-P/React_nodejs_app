const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
require("dotenv").config();
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWTKEY;
const multer =require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'))

const verifyToken=(req,res,next)=>{
  console.warn(req.headers['authorization']);
  let token=req.headers['authorization']
  if(token){
    token=token.split(' ')[1]
    Jwt.verify(token,jwtKey,(err, valid)=>{
      if(err){
        res.status(401).send({result:'Please provide a valid token'})
      }else{
        next()
      }
    })
  }else{
    res.status(403).send({result:'Please provide a token'})
  }
}

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
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
});
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
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
  } else {
    res.send({ result: "No user found " });
  }
});
app.post("/add-product",verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});
app.get("/products/:id",verifyToken, async (req, res) => {
  const products = await Product.find({ userId: req.params.id });
  if (products) {
    res.send(products);
  } else {
    res.send({ result: "No product found" });
  }
});
app.delete("/delete-product/:id",verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/productUpdatePage/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});
app.put("/updateProduct/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  ); 
  res.send(result);
});
app.get("/search/:key",verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});
app.put("/updateImage",verifyToken,upload.single('image'),async(req,res)=>{
  console.log(req.file,req.body);
  const imageUrl=req.file?.path
  if(!imageUrl){
    res.status(400).send({message:"Bad request"})
  }
  const result = await User.updateOne(
    { _id: req.body.userId },
    { $set: {imageUrl} }         
  );
  if(imageUrl){
    res.send({imageUrl})
  }
  
})
app.get("/single-User-Data/:id",verifyToken,async(req,res)=>{
  const userData = await User.find({ _id: req.params.id });
  if (userData) {
    res.status(200).send(userData);
  } else {
    res.status(400).send({ result: "No user Found" });
  }
})

app.post("/admin", async (req, res) => {
  const adminEmail=process.env.ADMIN_EMAIL
  const adminPassword=process.env.ADMIN_PASSWORD
  let user={}
  if (req.body.password && req.body.email) {
    if(req.body.email===adminEmail){
      if(req.body.password===adminPassword){
        user.email=adminEmail
        res.send({user,status:true})
      }else{
        res.send({message: "Invalid Password "})
      }
    }else{
      res.send({ message: "No user found" });
    }
  }
});
app.get("/searchUsers/:key",async (req, res) => {
  const result = await User.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { email: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});
app.get("/users", async (req, res) => {
  const users = await User.find();
  if (users) {
    res.send(users);
  } else {
    res.send({ result: "No product found" });
  }
});
app.listen(4000);
