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
        type: Schema.Types.ObjectId,
        ref: "PlaylistVideo",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
