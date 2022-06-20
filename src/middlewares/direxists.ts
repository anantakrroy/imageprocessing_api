import fs from "fs";
import express from "express";

const direxists = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const path = req.path.substring(1);
  const dir = "thumbs";
  let subdir!: string;
  if (path === "resize") subdir = "resizedImages";
  if (path === "rotate") subdir = "rotatedImages";
  if (path === "flip") subdir = "flippedImages";
  if (path === "blur") subdir = "blurredImages";
  if (path === "grayscale") subdir = "grscaleImages";

  if (!fs.existsSync(`./${dir}/${subdir}`))
    fs.mkdirSync(`${dir}/${subdir}`, { recursive: true });
  next();
};

export default direxists;
