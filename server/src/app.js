import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/likes", likeRouter);

app.use(errorHandler);

export { app };
