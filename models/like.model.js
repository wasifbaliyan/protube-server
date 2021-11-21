const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", likeSchema);
