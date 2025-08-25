import { BadRequestError, NotFoundError } from "../middlewares/errors.middleware.js";
import tourModel from "../models/tour.model.js";
import { APIFeatures } from "../utils/APIFeatures.js";
export default class TourService {
    static async getAllTours(query) {
        const features = new APIFeatures(tourModel.find(), query).filter().sort().limitFields().paginate();
        return await features.query;
    }
    static async createTour(tour) {
        const check = await tourModel.findOne({ name: tour.name });
        if (check) {
            throw new BadRequestError("Tour with this name already exists.", 400);
        } else {
            return await tourModel.create(tour);
        }
    }
    static async getTourById(id) {
        const tour = await tourModel.findById(id);
        if (!tour) {
            throw new NotFoundError("No tour found.", 404);
        };
        return tour;
    }
    static async updateTourById(id, tour) {
        const tourUpdate = await tourModel.findByIdAndUpdate(id, tour, { new: true, runValidators: true });
        if (!tourUpdate) {
            throw new NotFoundError("No tour found.", 404);
        }
        return tourUpdate;
    }
    static async deleteTourById(id) {
        const tour = await tourModel.findByIdAndDelete(id);
        if (!tour) {
            throw new NotFoundError("No tour found.", 404);
        }
        return tour;
    }
    static async aliasTopTours() {
        return await tourModel.find().sort('-ratingsAverage,price').limit(5);
    }
    static async stats() {
        return await tourModel.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            { $sort: { avgRating: -1 } }
        ]);
    }
}