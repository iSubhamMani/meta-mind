import { Router } from "express";
import { addNewPost } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.route("/add-post").post(addNewPost);

export default postRouter;
