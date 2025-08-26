import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { Email } from '../utils/email.js';
import { NotFoundError, EmailAlreadyExistsError } from '../middlewares/errors.middleware.js';
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
    static async logout() {
        return {
            message: 'User logged out successfully'
        }
    }
    static async forgotPassword() {
        return {
            message: "forgotPassword succeeded"
        }
    }
    static async resetPassword() {
        return {
            message: "resetPassword succeeded"
        }
    }
    static async updatePassword() {
        return {
            message: "updatePassword succeeded"
        }
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