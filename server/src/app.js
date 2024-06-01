import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://meta-mind.vercel.app",
  })
);

app.use(
  express.json({
    limit: "32kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes
import errorHandler from "./utils/errorHandler.js";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";
import likeRouter from "./routes/like.route.js";
import bookMarkRouter from "./routes/bookmark.route.js";

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/bookmarks", bookMarkRouter);

app.use(errorHandler);

export { app };
