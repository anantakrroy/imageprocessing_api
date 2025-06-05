import express from "express";
import fs from "fs";
import upload from "../utils/upload";
import resize from "../utils/resize";
import rotate from "../utils/rotate";
import metadata from "../utils/metadata";
import flip from "../utils/flip";
import blur from "../utils/blur";
import Info from "../interface/info";
import grayscale from "../utils/grayscale";
import direxists from "../middlewares/direxists";
import path from "path";

const routes = express.Router();
const dir = "build"; // Root folder to save resized images

// Home route
routes.get("/", (req: express.Request, res: express.Response) => {
  res.json("Home route...");
});

// Get gallery images
routes.get("/gallery", async (req: express.Request, res: express.Response) => {
  const dir = path.join(__dirname, '../gallery');
  const files = fs.readdirSync(dir).filter(file => /\.(jpe?g)$/i.test(file));
  res.json(files);
})

// Upload new image
routes.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.json({ filename: req.file.filename });
});

// resize image only jpg
routes.get("/resize", direxists, async (req: express.Request, res: express.Response) => {
  const filename = String(req.query.filename);
  const width = Number(req.query.width as unknown);
  const height = Number(req.query.height as unknown);
  const subDir = "thumbnails/resizedImages";
  const outputFilename = `${width}x${height}_${filename}`
  const outputPath = path.join(`/${subDir}/${outputFilename}`);
  const resizedUrl = `http://localhost:3000/resize/${outputFilename}`;

  try {

    // If image already exists, read from the disk, no processing done
    if (fs.existsSync(`./${dir}/${subDir}/${width}x${height}_${filename}`)) {
      res.json({
        message: "File resize successful",
        url: `${resizedUrl}`
      })
    } else {
      console.log('Resize API endpoint hit.....');
      console.log(`Current image dimensions >>>> Width : ${width} Height : ${height} and filename >>>> ${filename}`);


      await resize(filename, width, height)
        .then((info: Info) =>
          res.json({
            message: "File resize successful",
            url: resizedUrl,
            ...info
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
routes.get("/rotate", direxists, async (req: express.Request, res: express.Response) => {
  try {
    const image = `${req.query.filename}` + ".jpg";
    const angle = Number(req.query.angle as string);

    if (fs.existsSync("assets/" + image)) {
      const rotdata = await rotate(image, angle);
      res.json({
        message: `Image rotated successfully by ${angle} degrees`,
        ...rotdata,
      });
    } else {
      res.status(400).json({ message: "Image not found in assets !" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// convert image to grayscale
routes.get("/grayscale", direxists, async (req: express.Request, res: express.Response) => {
  try {
    const image = `${req.query.filename}` + ".jpg";

    if (fs.existsSync("assets/" + image)) {
      const graydata = await grayscale(image);
      res.json({
        message: `Image color changed to grayscale`,
        ...graydata,
      });
    } else {
      res.status(400).json({ message: "Image not found in assets !" });
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});


// flip  image
routes.get("/flip", direxists, async (req: express.Request, res: express.Response) => {
  try {
    const image = `${req.query.filename}` + ".jpg";

    if (fs.existsSync("assets/" + image)) {
      const flipdata = await flip(image);
      res.json({
        message: `Image flipped successfully along vertical Y axis`,
        ...flipdata,
      });
    } else {
      res.status(400).json({ message: "Image not found in assets !" });
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});


// blur image
routes.get("/blur", direxists, async (req: express.Request, res: express.Response) => {
  try {
    const image = `${req.query.filename}` + ".jpg";
    const sigma = Number(`${req.query.sigma}`);

    if (fs.existsSync("assets/" + image)) {
      const blurdata = await blur(image, sigma);
      res.json({
        message: `Image blurred successfully`,
        ...blurdata,
      });
    } else {
      res.status(400).json({ message: "Image not found in assets !" });
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});

export default routes;
