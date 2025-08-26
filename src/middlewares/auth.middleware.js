import { UnauthorizedError } from "./errors.middleware.js";
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";

export const protect = async (req, res, next) => {
    let token;
    //getting token from headers or cookies
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req?.cookies?.jwt) {
        token = req?.cookies?.jwt
    }
    if (!token) {
        return next(new UnauthorizedError('You are not logged in', 401));
    }
    //verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if user exists
    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
        return next(new UnauthorizedError('The user belonging to this token does no longer exist', 401))
    }
    //check if user changed password after token was generated
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new UnauthorizedError('User recently changed password! Please log in again.', 401));
    }

    req.user = currentUser;
    next();
}
export const permission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new UnauthorizedError('You do not have permission to perform this action', 403));
        }
        next();
    }
}