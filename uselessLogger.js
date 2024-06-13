module.exports = function uselessLogger(req, res, next) {
  console.log("Hey there I'm a middleware and I'm useless");
  next();
};
