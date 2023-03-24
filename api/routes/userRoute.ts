import Express from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/userController";

const router = Express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/user/profile", profile);
router.get("/logout", logout);

export default router;
