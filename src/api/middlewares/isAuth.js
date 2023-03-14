const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token){
        return res.status(401).send("token not available!");
    }
    try {
        const decoded = jwt.verify(token,process.env.ACCESSTOKEN_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).send("invalid token!");
    }
};
module.exports {isAuth};
