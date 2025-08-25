import { Router } from "express";
import tourRouter from "./tour/index.js";
const router = Router();
router.use('/v1/api/tour', tourRouter);
export default router;