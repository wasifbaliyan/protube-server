const express = require("express");
const router = express.Router();

const History = require("../models/history.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const videos = await History.find({ userId })
      .populate({ path: "videoId" })
      .exec();
    if (!videos) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({
      message: "Watched videos fetched successfully.",
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

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await History.findOne({ videoId: id });
    if (found) {
      return res.status(404).json({
        message: "video already exists.",
      });
    }
    const newHistoryVideo = await new History({
      videoId: id,
      userId: req.user._id,
    });

    await newHistoryVideo.save();
    res.status(200).json({
      message: "Video added to the History collection",
      response: {
        history: newHistoryVideo,
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
    const foundVideo = await History.findOneAndDelete({ videoId: id });
    if (!foundVideo) {
      return res.status(404).json({
        message: "No video found.",
      });
    }
    res.status(200).json({
      message: "Video removed from History successfully.",
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
