const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistVideoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
    playlistId: {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlaylistVideo", playlistVideoSchema);
