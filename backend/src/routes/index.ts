import express, { Router } from "express";
import authRouter from "./authRoutes";


interface Route {
  path: string;
  route: Router;
}

const allRoutes = express.Router();

const defaultRoutes: Route[] = [
  {
    path: "/auth",
    route: authRouter,
  },
 
];

defaultRoutes.forEach((route) => {
  allRoutes.use(route.path, route.route);
});

export default allRoutes;
