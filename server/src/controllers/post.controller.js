import Post from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addNewPost = asyncHandler(async (req, res) => {
  const { title, body, user } = req.body;

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  if (!title || !body) {
    throw new ApiError(400, "Title and body are required");
  }

  const post = await Post.create({
    author: user?.uid,
    title,
    body,
  });

  if (!post) {
    throw new ApiError(500, "Failed to create post");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully", post));
});

export { addNewPost };
