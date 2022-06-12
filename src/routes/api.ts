import express from "express";
import sharp from "sharp";
import fs from "fs";
import { promises as fspromises } from "fs";
import resize from "../utils/resize";

const routes = express.Router();

// Home route
routes.get("/", (req: express.Request, res: express.Response) => {
  res.json("Home route...");
});

// resize image only jpg
routes.get("/resize", async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename + ".jpg";
  const dir = "thumbs";
  const width = Number(req.query.width as unknown);
  const height = Number(req.query.height as unknown);
  try {
    if (fs.existsSync("./" + dir)) {
      await resize(filename, width, height)
        .then((info: { format: string; width: number; height: number }) =>
          res.send(`File resize successful >> Format : ${info.format}
        Width : ${info.width}px Height : ${info.height}px`)
        )
        .catch((err) => res.send(`Error >>> ${err}`));
    } else {
      await fspromises.mkdir("thumbs");
      await resize(filename, width, height)
        .then((info) =>
          res.send(`File resize successful >> Format : ${info.format}
        Width : ${info.width}px Height : ${info.height}px`)
        )
        .catch((err) => res.send(`Error >>> ${err}`));
    }
    // res.json(`File resized !!!`);
  } catch (err) {
    console.log(`${err}`);
    throw err;
  }
});

//  getimage metadata

//  resize image (all formats)

// pad image with custom color

// rotate  image

// flip  image

//  sharpen image

// blur image

// modulate image

// produce negative of image

// convert image to grayscale

export default routes;
