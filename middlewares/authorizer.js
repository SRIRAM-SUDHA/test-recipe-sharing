const jwt = require("jsonwebtoken");

exports.authenticate = async (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (jwtToken === undefined) {
    response.status(400);
    response.send("Invalid JWT Token");
  } else {
    try {
      const payload = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
      request.payload = payload;
      next();
    } catch (error) {
      response.status(400);
      response.send("Invalid JWT Token");
    }
  }
};
