import express from "express";

const validateDimensions = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const {width, height } = req.query;

  const w = Number(width);
  const h = Number(height);

  if (isNaN(w) || w <= 0) {
    return res.status(400).json({ error: "Width must be a positive number" });
  }

  if (isNaN(h) || h <= 0) {
    return res.status(400).json({ error: "Height must be a positive number" });
  }

  next();
};

export default validateDimensions;
