import { Router } from 'express';
import authController from '../../controllers/auth.controller.js';
import catchAsync from '../../middlewares/catchAsync.middleware.js';
const router = Router();
router.post('/register', catchAsync(authController.register));
router.post('/account-activation', catchAsync(authController.accountActivation));
router.post('/login', catchAsync(authController.login));
router.post('/logout', catchAsync(authController.logout));
router.post('/forgot-password', catchAsync(authController.forgotPassword));
router.post('/reset-password/:token', catchAsync(authController.resetPassword));
router.post('/update-password', catchAsync(authController.updatePassword));

export default router;