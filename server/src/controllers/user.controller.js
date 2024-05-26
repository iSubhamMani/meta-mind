import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Post from "../models/post.model.js";
import { BookMark } from "../models/bookmark.model.js";

const addUser = asyncHandler(async (req, res) => {
  const { user } = req.body;

  if (!user) {
    throw new ApiError(400, "User is required");
  }

  const newUser = await User.create({
    _id: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", newUser));
});

const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { page = 1, limit = 5 } = req.query;

  const options = {
    page,
    limit,
  };

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const pipeline = [
    {
      $match: { author: userId },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        __v: 0,
        "author.__v": 0,
      },
    },
  ];

  const posts = await Post.aggregatePaginate(Post.aggregate(pipeline), options);

  return res
    .status(200)
    .json(new ApiResponse(200, "User posts retrieved successfully", posts));
});

const getBookMarkedPosts = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { page = 1, limit = 5 } = req.query;

  const options = {
    page,
    limit,
  };

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const pipeline = [
    {
      $lookup: {
        from: "bookmarks",
        localField: "_id",
        foreignField: "post",
        as: "bookmarks",
      },
    },
    {
      $match: {
        "bookmarks.bookMarkedBy": userId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        __v: 0,
        "author.__v": 0,
        bookmarks: 0,
      },
    },
  ];

  const bookMarkedPosts = await Post.aggregatePaginate(
    Post.aggregate(pipeline),
    options
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "User posts retrieved successfully", bookMarkedPosts)
    );
});

export { addUser, getUserPosts, getBookMarkedPosts };
