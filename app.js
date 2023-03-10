const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const todosRoutes = require("./routes/todos-routes");

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

const PORT = config.get("port") || 5000;
const MONGO_DB = config.get("mongoDB");

async function start() {
  try {
    await mongoose.connect(MONGO_DB, {
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    // const collection = db.collection('Books');
    // const changeStream = collection.watch();
    // changeStream.on('change', event => {
    //    // event — см. типы событий: https://docs.mongodb.com/manual/reference/change-events/
    // });
    // !!! Change Streams работает только если сервер MongoDB запущен в режиме кластера, а не как он по-умолчанию запускается. Немного подробностей о том, как это сделать: https://habr.com/ru/post/335772/ (см. раздел «Настройка и добавление серверов в Replica Set»).
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () =>
  console.log(`Server has been started on port ${config.port}`)
);
