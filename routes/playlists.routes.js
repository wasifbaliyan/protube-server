const express = require("express");
const router = express.Router();

const Playlist = require("../models/playlist.model");
const PlaylistVideo = require("../models/playlistVideo.model");

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

router.get("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const playlist = await Playlist.findOne({ userId, _id: id });

    if (!playlist) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    const videos = await PlaylistVideo.find({
      userId,
      playlistId: playlist._id,
    })
      .populate({ path: "videoId" })
      .exec();
    playlist.videos = videos;
    res.status(200).json({
      message: "Playlist fetched successfully.",
      response: {
        playlist,
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

router.post("/videos", async (req, res) => {
  try {
    const { id, playlistId } = req.body;
    const foundPlaylist = await PlaylistVideo.findOne({
      _id: playlistId,
      userId: req.user._id,
      videoId: id,
    });
    if (foundPlaylist) {
      return res.status(404).json({ message: "Already exists" });
    }
    const savedVideo = await new PlaylistVideo({
      userId: req.user._id,
      playlistId,
      videoId: id,
    });
    await savedVideo.save();
    res.status(200).json({
      message: "Video added to the playlist collection",
      response: {
        video: savedVideo,
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

router.delete("/videos", async (req, res) => {
  try {
    const { id, playlistId } = req.query;
    const foundPlaylist = await PlaylistVideo.findOneAndDelete({
      playlistId: playlistId,
      userId: req.user._id,
      videoId: id,
    });
    if (!foundPlaylist) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    res.status(200).json({
      message: "Video removed from playlist successfully.",
      response: {
        video: foundPlaylist,
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
