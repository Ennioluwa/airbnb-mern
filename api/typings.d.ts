import { Document } from "mongoose";
import { User } from "./models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // refreshTokens: sting[];
}

interface IPlace extends Document {
  title: string;
  // title: string
  // title: string
  // title: string
  // title: string
  // title: string
  // title: string
  // title: string
  // title: string
  // title: string
}
