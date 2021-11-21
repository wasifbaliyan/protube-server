const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watch", watchSchema);
