import express from "express";
import dotenv from "dotenv";
import routes from "./routes/api";

const app = express();
const port = process.env.PORT || 3000;

app.use('/api',routes);

app.listen(port, (): void => {
  console.log(`Listening on port : ${port}`);
});
