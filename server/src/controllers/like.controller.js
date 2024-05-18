import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";

const toggleLike = asyncHandler(async (req, res) => {
  const { postId, user } = req.body;

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  const isLiked = await Like.findOne({ post: postId, likedBy: user });

  if (isLiked) {
    const unlike = await Like.deleteOne({ post: postId, likedBy: user });

    if (!unlike) throw new ApiError(500, "Failed to unlike post");

    return res
      .status(200)
      .json(new ApiResponse(200, "Post unliked successfully"));
  } else {
    const like = await Like.create({
      post: postId,
      likedBy: user,
    });

    if (!like) throw new ApiError(500, "Failed to like post");

    return res
      .status(200)
      .json(new ApiResponse(200, "Post liked successfully", like));
  }
});

const getLikeStatus = asyncHandler(async (req, res) => {
  const { postId, user } = req.body;

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  const isLiked = await Like.findOne({ post: postId, likedBy: user });

  if (isLiked) {
    return res.status(200).json(new ApiResponse(200, "Post is liked", true));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, "Post is not liked", false));
  }
});

export { toggleLike, getLikeStatus };
