import { Router } from "express";
import {
  deleteBookMark,
  getBookMarkStatus,
  toggleBookMark,
} from "../controllers/bookmark.controller.js";

const bookMarkRouter = Router();

bookMarkRouter.route("/toggle-bookmark").post(toggleBookMark);
bookMarkRouter.route("/get-bookmark-status").post(getBookMarkStatus);
bookMarkRouter.route("/delete-bookmark").post(deleteBookMark);

export default bookMarkRouter;
