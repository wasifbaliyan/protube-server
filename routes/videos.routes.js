const express = require("express");
const router = express.Router();

const Video = require("../models/video.model");

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({
      message: "Videos fetched successfully.",
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.status(404).json({
        message: "No video found.",
      });
    }
    res.status(200).json({
      message: "Video fetched successfully.",
      response: {
        product: foundVideo,
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
