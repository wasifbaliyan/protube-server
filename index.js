const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./db/db");
const auth = require("./routes/auth.routes");
const videos = require("./routes/videos.routes");
const likes = require("./routes/likes.routes");
const watchs = require("./routes/watchs.routes");
const history = require("./routes/history.routes");
const bookmarks = require("./routes/bookmarks.routes");
const verifyAuthentication = require("./middlewares/verify-auth.middleware");
const app = express();

connectToDB(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      response: "Welcome to Protube API!",
      message: "Data fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

app.use("/auth", auth);
app.use("/api/videos", videos);

app.use(verifyAuthentication);

app.use("/api/likes", likes);
app.use("/api/watchs", watchs);
app.use("/api/history", history);
app.use("/api/bookmarks", bookmarks);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening at port : ${port}`));
