const express = require("express");
const router = express.Router();

const Playlist = require("../models/playlist.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const playlists = await Playlist.find({ userId });

    if (!playlists) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({
      message: "Playlists fetched successfully.",
      response: {
        playlists,
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
    const { name } = req.body;
    const newPlaylist = await new Playlist({
      name,
      userId: req.user._id,
    });

    await newPlaylist.save();
    res.status(200).json({
      message: "Playlist created",
      response: {
        like: newPlaylist,
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
    const { id, playlistId } = req.body;
    const foundPlaylist = await Playlist.findById(playlistId);
    if (!foundPlaylist) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    const video = {
      userId: req.user._id,
      videoId: id,
    };
    foundPlaylist.videos.push(video);
    await foundPlaylist.save();
    res.status(200).json({
      message: "Video added to the playlist collection",
      response: {
        playlist: foundPlaylist,
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

router.delete("/", async (req, res) => {
  try {
    const { id, playlistId } = req.body;
    const foundPlaylist = await Playlist.findById(playlistId);
    if (!foundPlaylist) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    const filtered = foundPlaylist.videos.filter(
      (video) => video.videoId !== id
    );
    foundPlaylist.videos = filtered;
    await foundPlaylist.save();
    res.status(200).json({
      message: "Video removed from playlist successfully.",
      response: {
        playlist: foundPlaylist,
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
