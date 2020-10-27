const admin = require("../config/firebase");

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.body = {};
      req.body.email = decodedToken.email;
      next();
    } else {
      return res.status(401).send("Not authorized");
    }
  } catch (e) {
    return res.status(401).send("Not authorized");
  }
}

module.exports = verifyToken;
