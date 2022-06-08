import express from "express";
import sharp  from "sharp";

const routes = express.Router();

// Home route
routes.get("/", (req: express.Request,res: express.Response) => {
    res.json("Home route...");
})

// resize image
routes.get("/resize?")

export default routes;