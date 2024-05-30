import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { BookMark } from "../models/bookmark.model.js";

const toggleBookMark = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    throw new ApiError(400, "Post ID and User ID are required");
  }

  const isBookmarked = await BookMark.findOne({
    post: postId,
    bookMarkedBy: userId,
  });

  if (isBookmarked) {
    const unMark = await BookMark.deleteOne({
      post: postId,
      bookMarkedBy: userId,
    });

    if (!unMark) throw new ApiError(500, "Failed to unbookmark post");

    return res
      .status(200)
      .json(new ApiResponse(200, "Post unbookmarked successfully"));
  } else {
    const bookMarkedPost = await BookMark.create({
      post: postId,
      bookMarkedBy: userId,
    });

    if (!bookMarkedPost) {
      throw new ApiError(500, "Failed to bookmark post");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Post bookmarked successfully", bookMarkedPost)
      );
  }
});

const getBookMarkStatus = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    throw new ApiError(400, "Post ID and User ID are required");
  }

  const bookMarkedPost = await BookMark.findOne({
    post: postId,
    bookMarkedBy: userId,
  });

  if (bookMarkedPost) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Post is bookmarked", true));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, "Post is not bookmarked", false));
  }
});

const deleteBookMark = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    throw new ApiError(400, "Post ID and User ID are required");
  }

  const unMark = await BookMark.deleteOne({
    post: postId,
    bookMarkedBy: userId,
  });

  if (!unMark) throw new ApiError(500, "Failed to unbookmark post");

  return res
    .status(200)
    .json(new ApiResponse(200, "Post unbookmarked successfully"));
});

export { toggleBookMark, getBookMarkStatus, deleteBookMark };
