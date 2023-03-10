const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = model("Todo", TodoSchema);
