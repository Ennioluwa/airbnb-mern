import { model, Model, Schema } from "mongoose";
import { IPlace } from "../typings";

const placeSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    extraInfo: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Number,
      required: true,
    },
    checkOut: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Place", placeSchema);
