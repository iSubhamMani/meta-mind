import { Router } from "express";
import {
  addNewPost,
  deletePost,
  getFeaturedPosts,
  getPostById,
  getSearchResults,
  getWhatsNewPosts,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.route("/add-post").post(addNewPost);
postRouter.route("/featured").post(getFeaturedPosts);
postRouter.route("/whats-new").post(getWhatsNewPosts);
postRouter.route("/get-post/:id").get(getPostById);
postRouter.route("/search").get(getSearchResults);
postRouter.route("/delete-post").post(deletePost);

export default postRouter;
