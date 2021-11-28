const express = require("express");
const router = express.Router();

const Like = require("../models/like.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const videos = await Like.find({ userId })
      .populate({ path: "videoId" })
      .exec();
    if (!videos) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({
      message: "Liked videos fetched successfully.",
      response: {
        videos,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;
    const found = await Like.findOne({ videoId: id, userId });
    if (found) {
      return res.status(404).json({
        message: "video already exists.",
      });
    }
    const newLikedVideo = await new Like({
      videoId: id,
      userId: req.user._id,
    });

    await newLikedVideo.save();
    res.status(200).json({
      message: "Video added to the liked collection",
      response: {
        like: newLikedVideo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const foundVideo = await Like.findOneAndDelete({ videoId: id, userId });
    if (!foundVideo) {
      return res.status(404).json({
        message: "No video found.",
      });
    }
    res.status(200).json({
      message: "Video removed from liked successfully.",
      response: {
        video: foundVideo,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;
