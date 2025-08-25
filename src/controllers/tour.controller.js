import TourService from "../services/tour.service.js";
import { SuccessResponse } from "../middlewares/response.middleware.js";
class TourController {
    getAllTours = async (req, res) => {
        new SuccessResponse({
            message: "getAllTour success.",
            metadata: await TourService.getAllTours()
        }).send(res);
    }
    createTour = async (req, res, next) => {
        new SuccessResponse({
            message: "createTour success.",
            metadata: await TourService.createTour(req.body)
        }).send(res);
    }
    getTourById = async (req, res, next) => {
        new SuccessResponse({
            message: "getTourById success.",
            metadata: await TourService.getTourById(req.params.id)
        }).send(res);
    }
    updateTourById = async (req, res, next) => {
        new SuccessResponse({
            message: "updateTourById success.",
            metadata: await TourService.updateTourById(req.params.id, req.body)
        }).send(res);
    }
    deleteTourById = async (req, res, next) => {
        new SuccessResponse({
            message: "deleteTourById success.",
            metadata: await TourService.deleteTourById(req.params.id)
        }).send(res);
    }
}
export default new TourController();