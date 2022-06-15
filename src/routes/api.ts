import express from "express";
import fs from "fs";
import { promises as fspromises } from "fs";
import resize from "../utils/resize";
import metadata from "../utils/metadata";
import Info from "../interface/info";
import sharp from "sharp";

const routes = express.Router();
const dir = "thumbs"; // Root folder to save resized images

// Home route
routes.get("/", (req: express.Request, res: express.Response) => {
  res.json("Home route...");
});

// resize image only jpg
routes.get("/resize", async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename + ".jpg";
  const width = Number(req.query.width as unknown);
  const height = Number(req.query.height as unknown);
  try {
    if (!fs.existsSync("./" + dir)) fs.mkdirSync(dir);
    // If image already exists, read from the disk, no processing done
    if (fs.existsSync(`./${dir}/${width}x${height}_${filename}`)) {
      const file = fs.readFileSync(`./${dir}/${width}x${height}_${filename}`, {
        encoding: "base64",
      });
      const image = Buffer.from(file, "base64");
      res.sendFile(
        `${width}x${height}_${filename}`,
        {
          root: "thumbs",
          headers: {
            "Content-Type": "image/jpg",
            "Content-Length": image.length,
          },
        },
        function(err){
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
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});

//  getimage metadata
routes.get(
  "/metadata/:filename",
  async (req: express.Request, res: express.Response) => {
    const inputFile = "./assets/" + req.params.filename + ".jpg";
    try {
      if (fs.existsSync(inputFile)) {
        const inputImageData = await metadata(inputFile);
        res.json(inputImageData);
      } else {
        res.json({ message: "File does not exist !" });
      }
    } catch (err) {
      res.json(err);
    }
  }
);

// rotate  image --- OPTIONAL
routes.get("/rotate", async (req: express.Request, res: express.Response) => {
  try {
    const image = `${req.query.filename}` + ".jpg";
    const angle = Number(req.query.angle as string);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (fs.existsSync("assets/" + image)) {
      sharp("assets/" + image)
        .rotate(angle)
        .toBuffer(function (err, outputBuffer, info) {
          if (err)
            res
              .status(400)
              .json({ error: `${err}`, message: "Error rotating image !" });
          if (info && outputBuffer) {
            const rotImg = Buffer.from(outputBuffer);
            fs.writeFileSync(
              `thumbs/rotated_${info.width}x${info.height}_${image}`,
              rotImg
            );
            res.status(200).json({
              message: "Rotated image !",
              dimension: `${info.width}x${info.height}`,
            });
          }
        });
    } else {
      res.status(400).json({ message: "Image not found in assets !" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// convert image to grayscale


// flip  image
routes.get("/flip", async (req: express.Request, res: express.Response) => {
  try {
    const image = `${req.query.filename}` + ".jpg";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (fs.existsSync("assets/" + image)) {
      sharp("assets/" + image)
        .flip()
        .toBuffer(function (err, outputBuffer, info) {
          if (err)
            res
              .status(400)
              .json({ error: `${err}`, message: "Error flipping image !" });
          if (info && outputBuffer) {
            const rotImg = Buffer.from(outputBuffer);
            fs.writeFileSync(
              `thumbs/flipped_${info.width}x${info.height}_${image}`,
              rotImg
            );
            res.status(200).json({
              message: "Flipped image !",
              dimension: `${info.width}x${info.height}`,
            });
          }
        });
    } else {
      res.status(400).json({ message: "Image not found in assets !" });
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});
//  sharpen image

// blur image

// modulate image

// produce negative of image


//  resize image to a different format

// pad image with custom color

export default routes;
