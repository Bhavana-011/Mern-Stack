const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("No token");
  }

  //  Remove "Bearer"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};