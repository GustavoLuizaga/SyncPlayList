import { Router } from "express";
import MusicRoutes from "../modules/music/music.routes";
import HealthRoutes from "../modules/health_check/health.routes";
import AuthRouter from "../modules/auth/auth.routes";


const AppRoutes = Router();

AppRoutes.use("/music", MusicRoutes);
AppRoutes.use("/auth", AuthRouter);
AppRoutes.use("/health", HealthRoutes);


export default AppRoutes;