const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  author_url: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  youtube_id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Video", videoSchema);
