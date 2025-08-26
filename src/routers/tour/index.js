import { Router } from 'express';
import tourController from '../../controllers/tour.controller.js';
import catchAsync from '../../middlewares/catchAsync.middleware.js';
import { protect, permission } from '../../middlewares/auth.middleware.js';
const router = Router();

router.route("/")
    .get(catchAsync(tourController.getAllTours))
    .post(catchAsync(tourController.createTour));
router.route("/top-tours").get(catchAsync(tourController.aliasTopTours));
router.route("/stats").get(catchAsync(tourController.stats));
router.route("/year-stats/:year").get(catchAsync(tourController.yearStats));
router.route("/:id")
    .get(catchAsync(tourController.getTourById))
    .patch(catchAsync(tourController.updateTourById))
    .delete(protect, permission('admin'), catchAsync(tourController.deleteTourById));
export default router;
