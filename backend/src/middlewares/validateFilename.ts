import express from "express";

const validateFilename = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const {filename} = req.query;

    if (!filename || typeof filename !== "string" || filename.trim() === "") {
        return res.status(400).json({ error: "Missing or invalid filename" });
    }

    next();
}

export default validateFilename;