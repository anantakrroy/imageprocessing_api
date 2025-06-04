import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb) => cb(null, path.join(__dirname, '../../gallery')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req: Express.Request, file, cb) => {
    if (file.mimetype === 'image/jpeg') cb(null, true);
    else cb(new Error('Only .jpg files are allowed!'));
  },
});

export default upload;