import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { NotFoundError, EmailAlreadyExistsError, AppError } from '../middlewares/errors.middleware.js';
import { Email } from '../utils/email.js';
import crypto from 'crypto'
export default class AuthService {
    static async register(user, req, res) {
        const existingUser = await userModel.findOne({ email: user.email }).exec();
        if (existingUser) {
            throw new EmailAlreadyExistsError('Email already exists');
        }
        const newUser = await userModel.create(user);
        //const url = `/me`
        //await new Email(newUser, url).sendWelcome();
        return await this.createSendToken(newUser, 201, req, res);
    }
    static async accountActivation() {
        return {
            message: 'Account activated successfully'
        }
    }
    static async registerMessage() {
        return {
            message: 'User registered successfully'
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new NotFoundError('Please provide email and password', 400);
        }
        const user = await userModel.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new NotFoundError('Incorrect email or password', 401);
        }
        return await this.createSendToken(user, 200, req, res);
    }
    static async logout(req, res, next) {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        return { status: 'success' }
    }
    static async forgotPassword(req, res, next) {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            throw new AppError('There is no user with email address.', 404);
        }
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        try {
            const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
            await new Email(user, resetURL).send('passwordReset');
            return {
                message: 'Password reset email sent successfully'
            }
        } catch (error) {
            console.log(error);
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            throw new AppError('Error sending password reset email', 500);
        }
    }
    static async resetPassword(req, res, next) {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await userModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        })
        //if token is valid + valid user then set new password, else throw error.
        if (!user) {
            throw new AppError('Token is invalid or has expired', 400);
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        //update changePasswordAt + log user + send JWT
        return this.createSendToken(user, 200, req, res);
    }
    static async updatePassword(req, res, next) {
        const user = await userModel.findById(req.user.id).select('+password');
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            throw new AppError('Your current password is wrong.', 401);
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();
        return this.createSendToken(user, 200, req, res);
    }
    static async signToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }
    static async createSendToken(user, statusCode, req, res) {
        const token = await this.signToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        });
        user.password = undefined;
        return {
            token, data: {
                user
            }
        }
    }
}