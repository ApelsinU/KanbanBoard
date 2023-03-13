const { Schema, model, Types } = require("mongoose");

const TodoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", TodoSchema);
