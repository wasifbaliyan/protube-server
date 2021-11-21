const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    videos: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        videoId: { type: Schema.Types.ObjectId, ref: "Video" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
