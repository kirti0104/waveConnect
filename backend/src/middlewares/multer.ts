import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDirectory = path.join(__dirname, 'uploads'); 

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage });

console.log("Multer upload setup complete, file uploads will be stored in the 'uploads' directory.");

export default upload;
