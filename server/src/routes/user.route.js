import { Router } from "express";
import { addUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/add-user").post(addUser);

export default userRouter;
