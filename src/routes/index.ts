import express from "express";
import messageRoutes from "./message.routes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/messages",
    route: messageRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
