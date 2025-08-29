import { SuccessResponse } from "../middlewares/response.middleware.js"
import AuthService from "../services/auth.service.js";
import userModel from "../models/user.model.js";
class AuthController {
    register = async (req, res, next) => {
        const isFirstAccount = (await userModel.countDocuments({})) === 0;
        const role = isFirstAccount ? 'admin' : 'user';
        new SuccessResponse({
            message: "signup succeeded",
            metadata: await AuthService.register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                role: role
            }, req, res)
        }).send(res);
    }
    accountActivation = async (req, res, next) => {
        new SuccessResponse({
            message: "account activation succeeded",
            metadata: await AuthService.accountActivation()
        }).send(res);
    }
    login = async (req, res, next) => {
        new SuccessResponse({
            message: "login succeeded",
            metadata: await AuthService.login(req, res)
        }).send(res);
    }
    logout = async (req, res, next) => {
        new SuccessResponse({
            message: "logout succeeded",
            metadata: await AuthService.logout(req, res, next)
        }).send(res);
    }
    resetPassword = async (req, res, next) => {
        new SuccessResponse({
            message: "reset password succeeded",
            metadata: await AuthService.resetPassword(req, res, next)
        }).send(res);
    }
    updatePassword = async (req, res, next) => {
        new SuccessResponse({
            message: "update password succeeded",
            metadata: await AuthService.updatePassword(req, res, next)
        }).send(res);
    }
    forgotPassword = async (req, res, next) => {
        new SuccessResponse({
            message: "forgot password succeeded",
            metadata: await AuthService.forgotPassword(req, res, next)
        }).send(res);
    }
}
export default new AuthController();
