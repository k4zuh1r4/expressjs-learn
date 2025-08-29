import { SuccessResponse } from "../middlewares/response.middleware.js";
import UserService from "../services/user.service.js";
class UserController {
    getAllUsers = async (req, res, next) => {
        return new SuccessResponse({
            message: "Users retrieved successfully",
            metadata: await UserService.getAllUsers(req.query)
        }).send(res);
    }
    createUser = async (req, res, next) => {
        return new SuccessResponse({
            message: "User created successfully",
            metadata: await UserService.createUser(req.body)
        }).send(res);
    }
    getUser = async (req, res, next) => {
        return new SuccessResponse({
            message: "User retrieved successfully",
            metadata: await UserService.getUser(req.params.id)
        }).send(res);
    }
    updateUser = async (req, res, next) => {
        return new SuccessResponse({
            message: "User updated successfully",
            metadata: await UserService.updateUser(req.params.id, req.body)
        }).send(res);
    }
    deleteUser = async (req, res, next) => {
        return new SuccessResponse({
            message: "User deleted successfully",
            metadata: await UserService.deleteUser(req.params.id)
        }).send(res);
    }
}
export default new UserController();