const fetch = require("node-fetch");

const checkUser = (username, pass) => {
    const user = "admin";
    const password = "admin";
    return username === user && pass === password;
};

const authUser = async (req, res, next) => {
    const { username, password } = req.headers;
  
    if (!username || !password) {
      await fetchImage(401, res);
      return;
    }
  
    if (!checkUser(username, password)) {
      await fetchImage(403, res);
      return;
    }
  
    next();
  };

const fetchImage = async (statusCode, res) => {
    const response = await fetch(`https://http.cat/${statusCode}.jpg`);
    const buffer = await response.buffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.send(buffer);
};

module.exports = {authUser, fetchImage};