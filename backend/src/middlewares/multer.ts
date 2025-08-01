import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDirectory = path.join(__dirname, "../public/uploads"); 

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => 
    cb(null, uploadDirectory),
  
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, //50 MB
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;

    if (!file.originalname.match(allowedExtensions)) {
      return cb(
        new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type.")
      );
    }
    cb(null, true);
  },
});


export default upload;
