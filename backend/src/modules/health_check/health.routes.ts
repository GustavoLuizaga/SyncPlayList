import { Router } from "express";
import { healthCheck } from "./health.cotroller";

const HealthRoutes = Router();

HealthRoutes.get('/', healthCheck);

export default HealthRoutes;