import { Router } from "express";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { authorize } from "../middlewares/authorize.js";
const router = Router();

router.use(authenticateJWT, authorize(["Admin"]));

router.get("/getEmployes", getEmployees);
router.post("/addEmployee", addEmployee);
router.patch("/updateEmployee", updateEmployee);

export default router;
