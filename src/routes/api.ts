import express from "express";
import sharp from "sharp";
import fs from "fs";
import { promises as fspromises } from "fs";
import resize from "../utils/resize";
import Info from "../interface/info";

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
      if (fs.existsSync(`./${dir}/${filename}`)) {
        const file = fs.readFileSync(`./${dir}/${filename}`, {
          encoding: "base64",
        });
        const image = Buffer.from(file, "base64");
        res.sendFile(
          `${filename}`,
          {
            root: "thumbs",
            headers: {
              "Content-Type": "image/jpg",
              "Content-Length": image.length,
            },
          },
          function (err) {
            if (err) {
              res.status(400).json({
                error: err.name,
                detail: err.message,
              });
            } else {
              res.status(200).end();
            }
          }
        );
      } else {
        await resize(filename, width, height)
          .then((info: Info) =>
            res.json({
              message: "File resize successful",
              ...info,
            })
          )
          .catch((err) => res.status(400).json({ message: `${err}` }));
      }
    } else {
      await fspromises.mkdir("thumbs");
      await resize(filename, width, height)
        .then((info: Info) =>
          res.json({
            message: "File resize successful",
            ...info,
          })
        )
        .catch((err) => res.status(400).json({ message: `${err}` }));
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
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
