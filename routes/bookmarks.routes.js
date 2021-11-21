const express = require("express");
const router = express.Router();

const Bookmark = require("../models/bookmark.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const videos = await Bookmark.find({ userId })
      .populate({ path: "videoId" })
      .exec();
    if (!videos) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({
      message: "Bookmark videos fetched successfully.",
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
    const newbookmarkedVideo = await new Bookmark({
      videoId: id,
      userId: req.user._id,
    });

    await newbookmarkedVideo.save();
    res.status(200).json({
      message: "Video added to the bookmarked collection",
      response: {
        bookmark: newbookmarkedVideo,
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
    const foundVideo = await Bookmark.findByIdAndDelete(id);
    if (!foundVideo) {
      return res.status(404).json({
        message: "No video found.",
      });
    }
    res.status(200).json({
      message: "Video removed from bookmarks successfully.",
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
