const jwtKey = process.env.JWTKEY;
const Jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    console.warn(req.headers['authorization']);
    let token = req.headers['authorization']
    if (token) {
      token = token.split(' ')[1]
      Jwt.verify(token,jwtKey,(err, valid) => {
        if (err) {
          res.status(401).send({result:'Please provide a valid token'})
        } else {
          console.log('Token verified', valid);
          next()
        }
      })
    } else {
      res.status(403).send({result:'Please provide a token'})
    }
  }

