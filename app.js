const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;
const MONGO_DB = config.get("mongoDB");

async function start() {
  try {
    await mongoose.connect(MONGO_DB, {
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () =>
  console.log(`App has been started on port ${config.port}`)
);
