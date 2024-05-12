import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export { addUser };
