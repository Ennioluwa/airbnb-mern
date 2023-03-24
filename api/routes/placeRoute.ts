import { Router } from "express";
import multer from "multer";
import {
  createPlace,
  deleteImage,
  uploadImage,
  uploadImageByLink,
} from "../controllers/placeController";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload-by-link", uploadImageByLink);
router.post("/upload", upload.array("photos", 12), uploadImage);
router.delete("/uploads/:imgName", deleteImage);
router.post("/places", createPlace);

export default router;
