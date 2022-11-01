const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //todos: [{type: Types.Objectd, ref: 'Todo'}]
});

module.exports = model("User", UserSchema);
