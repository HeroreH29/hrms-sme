import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { authorize } from "../middlewares/authorize.js";
const router = Router();

router.use(authenticateJWT);
router.use(authorize(["Admin"]));
router.get("/getUsers", userController.getUsers);
router.post("/createUser", userController.createUser);
router.patch("/updateUser", userController.updateUser);

export default router;
