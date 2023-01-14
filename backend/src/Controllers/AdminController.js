const User = require("../Models/UserSchema");
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

exports.AdminLogin = (req, res) => {
    let user = {}
    if (req.body.password && req.body.email) {
      if (req.body.email === adminEmail) {
        if (req.body.password === adminPassword) {
          user.email = adminEmail
          res.send({user, status:true})
        } else {
          res.send({message: "Invalid Password "})
        }
      } else {
        res.send({ message: "No user found" });
      }
    }
}
exports.getAllUsers = (req,res) => {
    User
        .find()
        .then((users) => {
            if (users) {
                res.send(users);
              } else {
                res.send({ result: "No product found" });
              }
        })
        .catch(error => console.log('error',error))
}
exports.searchInUsers = (req,res) => {
    User
        .find({
            $or: [
            { name: { $regex: req.params.key, $options: "i" } },
            { email: { $regex: req.params.key, $options: "i" } },
            ],
        })
        .then((result) => {
            res.send(result)
        })
        .catch(error => console.log('error',error));
}
