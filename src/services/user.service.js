import { APIFeatures } from "../utils/APIFeatures.js";
import userModel from "../models/user.model.js";
import { NotFoundError } from "../middlewares/errors.middleware.js";

export default class UserService {
    static async getAllUsers(query) {
        const features = new APIFeatures(userModel.find(), query).filter().sort().limitFields().paginate();
        return features.query;
    }

    static async createUser(user) {
        return await userModel.create(user);
    }

    static async getUser(id) {
        const user = await userModel.findById(id);
        if (!user) throw new NotFoundError("User not found", 404);
        return user;
    }

    static async updateUser(id, data) {
        const user = await userModel.findByIdAndUpdate(id, data,
            {
                new: true,
                runValidators: true
            });
        if (!user) throw new NotFoundError("User not found", 404);
        return user;
    }

    static async deleteUser(id) {
        const user = await userModel.findByIdAndDelete(id);
        if (!user) throw new NotFoundError("User not found", 404);
        return user;
    }
}

