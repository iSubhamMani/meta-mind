import { Router } from "express";
import {
  addUser,
  getBookMarkedPosts,
  getUserPosts,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/add-user").post(addUser);
userRouter.route("/user-posts").post(getUserPosts);
userRouter.route("/bookmarked-posts").post(getBookMarkedPosts);

export default userRouter;
