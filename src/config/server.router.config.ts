import { Router } from "express";
import MusicRoutes from "../modules/music/music.routes";
import HealthRoutes from "../modules/health_check/health.routes";


const AppRoutes = Router();

AppRoutes.use("/music", MusicRoutes);
AppRoutes.use("/health", HealthRoutes);

export default AppRoutes;