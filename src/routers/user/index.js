import { Router } from 'express';
import authController from '../../controllers/auth.controller.js';
import catchAsync from '../../middlewares/catchAsync.middleware.js';
import userController from '../../controllers/user.controller.js';
import { protect, permission } from '../../middlewares/auth.middleware.js';
const router = Router();
router.post('/register', catchAsync(authController.register));
router.post('/account-activation', catchAsync(authController.accountActivation));
router.post('/login', catchAsync(authController.login));
router.post('/logout', catchAsync(authController.logout));
router.post('/forgot-password', catchAsync(authController.forgotPassword));
router.post('/reset-password/:token', catchAsync(authController.resetPassword));
router.post('/update-password', catchAsync(authController.updatePassword));

router.route('/')
    .get(protect, permission('admin'), catchAsync(userController.getAllUsers))
    .post(protect, permission('admin'), catchAsync(userController.createUser));
router.route('/:id')
    .get(protect, permission('admin'), catchAsync(userController.getUser))
    .patch(protect, permission('admin'), catchAsync(userController.updateUser))
    .delete(protect, permission('admin'), catchAsync(userController.deleteUser));
export default router;