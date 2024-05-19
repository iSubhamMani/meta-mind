import Post from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addNewPost = asyncHandler(async (req, res) => {
  const { title, description, body, user } = req.body;

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  if (!title || !body || !description) {
    throw new ApiError(400, "Title, description and body are required");
  }

  const post = await Post.create({
    author: user?.uid,
    title,
    description,
    body,
  });

  if (!post) {
    throw new ApiError(500, "Failed to create post");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully", post));
});

const getFeaturedPosts = asyncHandler(async (req, res) => {
  // get the featured posts
  const { user } = req.body;
  const { page = 1, limit = 5 } = req.query;

  if (!user) throw new ApiError(401, "Unauthorized user");

  const options = {
    page,
    limit,
  };

  const pipeline = [
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "post",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
      },
    },
    {
      $sort: {
        likesCount: -1,
        createdAt: 1, // Secondary sorting by createdAt if likesCount is the same
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              __v: 0,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        author: {
          $first: "$author",
        },
      },
    },
    {
      $project: {
        likes: 0,
        __v: 0,
      },
    },
  ];

  const posts = await Post.aggregatePaginate(Post.aggregate(pipeline, options));

  return res.status(200).json(new ApiResponse(200, "Featured posts", posts));
});

const getWhatsNewPosts = asyncHandler(async (req, res) => {
  const { user } = req.body;

  if (!user) throw new ApiError(401, "Unauthorized user");

  const whatsNewPosts = await Post.find()
    .populate("author", "-__v")
    .select("-__v")
    .sort({ createdAt: -1 })
    .limit(3);

  return res
    .status(200)
    .json(new ApiResponse(200, "Whats new posts", whatsNewPosts));
});

const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "Post id is required");

  const post = await Post.findById(id, { __v: 0 }).populate("author", "-__v");

  if (!post) throw new ApiError(404, "Post not found");

  return res.status(200).json(new ApiResponse(200, "Post found", post));
});

export { addNewPost, getFeaturedPosts, getPostById, getWhatsNewPosts };
