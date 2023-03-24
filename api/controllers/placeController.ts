import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import imageDownloader from "image-downloader";
import getErrorMessage from "../utils/dbErrorHandler";
import { realpathSync, renameSync, unlink } from "fs";
import Place from "../models/placeModel";
import { config } from "../config/config";

export const uploadImageByLink = async (req: Request, res: Response) => {
  const { link } = req.body;
  try {
    const newName = "photo" + Date.now() + ".jpg";
    imageDownloader
      .image({
        url: link,
        dest:
          "/Users/timarowoogun/Documents/mern-airbnb/api" +
          "/uploads/" +
          newName,
      })
      .then((data) => {
        console.log(data);
        res.json(newName);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json(err);
      });
  } catch (error) {
    console.log(getErrorMessage(error));
    return res.status(400).json({ message: "image upload error", error });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const data = req.files;
  if (!req.files) {
    return res.status(404).json({ message: "image upload error" });
  }

  try {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      //@ts-ignore
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const newPath = path + Date.now() + "." + parts[parts.length - 1];
      renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.log(getErrorMessage(error));
    return res.status(400).json({ message: "image upload error", error });
  }
};
export const deleteImage = async (req: Request, res: Response) => {
  const { imgName } = req.params;
  if (!imgName) {
    return res.status(400).json({ message: "unable to delete image" });
  }
  console.log(imgName);
  try {
    console.log(`Current directory: ${realpathSync(".")}`);
    unlink(`uploads/${imgName}`, (err) => {
      if (err) {
        return res.status(400).json({ message: "unable to delete image" });
      }
      return res.json({ message: "Image deleted successfully" });
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return res.status(400).json({ message: "image upload error", error });
  }
};

export const createPlace = async (req: Request, res: Response) => {
  try {
    const {
      title,
      address,
      addedPhotos: photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;
    const { token } = req.cookies;
    verify(token, config.secret, async (err: any, user: any) => {
      if (err || !user) {
        console.log(getErrorMessage(err));
        return res.status(400).json({ message: "Jwt error" });
      }
      const newPlace = new Place({
        title,
        address,
        photos: photos,
        description,
        perks,
        checkIn,
        checkOut,
        maxGuests,
        extraInfo,
        owner: user.id,
      });
      try {
        await newPlace.save();
        res.json(newPlace);
        console.log(newPlace);
      } catch (error) {
        console.log(getErrorMessage(error));
        return res
          .status(400)
          .json({ message: "unable to add new place", error });
      }
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return res.status(400).json({ message: "unable to add new place", error });
  }
};
