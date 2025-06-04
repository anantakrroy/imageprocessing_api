import express from "express";
import routes from "./routes/api";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

const gallery = path.join(__dirname, "gallery");
console.log('Gallery path >>> ', gallery);
const thumbnails = path.join(__dirname, "thumbnails");

app.use("/gallery", express.static(gallery));
app.use("/thumbnails", express.static(thumbnails));

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use("/api/images", routes);

app.listen(port, (): void => {
  console.log(`Listening on port : ${port}`);
});

export default app;
