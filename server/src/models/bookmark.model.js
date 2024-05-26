import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookMarkSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    bookMarkedBy: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

bookMarkSchema.plugin(mongooseAggregatePaginate);

export const BookMark = mongoose.model("BookMark", bookMarkSchema);
