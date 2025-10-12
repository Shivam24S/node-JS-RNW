import HttpError from "./errorHandler.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new HttpError("access Denied", 403));
    }
    next();
  };
};

export default authorize;
