import TourService from "../services/tour.service.js";
import { CREATED, SuccessResponse } from "../middlewares/response.middleware.js";
class TourController {
    getAllTours = async (req, res, next) => {
        new SuccessResponse({
            message: "getAllTour success.",
            metadata: await TourService.getAllTours(req.query)
        }).send(res);
    }
    createTour = async (req, res, next) => {
        new CREATED({
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
    aliasTopTours = async (req, res, next) => {
        new SuccessResponse({
            message: "aliasTopTours success.",
            metadata: await TourService.aliasTopTours(req.query)
        }).send(res);
    }
    stats = async (req, res, next) => {
        new SuccessResponse({
            message: "stats success.",
            metadata: await TourService.stats(req.query)
        }).send(res);
    }
}
export default new TourController();