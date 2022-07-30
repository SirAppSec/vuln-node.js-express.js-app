const jwt = require("jsonwebtoken");
const config = require("./../config");
const db = require("./../orm");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["Token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  //jwt.verify(token, config.jwtSecret, (err, decoded) => {
    jwt.decode(token, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
};
module.exports = authJwt;
