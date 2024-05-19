import { Router } from "express";
import {
  addNewPost,
  getFeaturedPosts,
  getPostById,
  getWhatsNewPosts,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.route("/add-post").post(addNewPost);
postRouter.route("/featured").post(getFeaturedPosts);
postRouter.route("/whats-new").post(getWhatsNewPosts);
postRouter.route("/get-post/:id").get(getPostById);

export default postRouter;
