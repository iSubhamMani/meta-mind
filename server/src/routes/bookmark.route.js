import { Router } from "express";
import {
  getBookMarkStatus,
  toggleBookMark,
} from "../controllers/bookmark.controller.js";

const bookMarkRouter = Router();

bookMarkRouter.route("/toggle-bookmark").post(toggleBookMark);
bookMarkRouter.route("/get-bookmark-status").post(getBookMarkStatus);

export default bookMarkRouter;
