import express from "express";
import routes from "./routes/api";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

const gallery = path.join(__dirname, "gallery");
console.log('Gallery path >>> ', gallery);
const thumbnails = path.join(__dirname, "thumbnails");


app.use(cors({
  origin: "http://localhost:5173"
}));
app.use("/api/images", routes);
app.use("/gallery", express.static(gallery));
app.use("/resize", express.static(path.join(__dirname, 'thumbnails/resizedImages')));

app.listen(port, (): void => {
  console.log(`Listening on port : ${port}`);
});

export default app;
