import Router from "express";
import { getLikeStatus, toggleLike } from "../controllers/like.controller.js";

const likeRouter = Router();

likeRouter.route("/toggle-like").post(toggleLike);
likeRouter.route("/like-status").post(getLikeStatus);

export default likeRouter;
