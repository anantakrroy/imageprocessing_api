import express from "express";

const validateAngle = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const {angle} = req.query;

  const a = Number(angle);

  if(isNaN(a)) {
    return res.status(400).json({error : "Angle must be a valid number"});
  }

  next();
};

export default validateAngle;
