import { model, Mongoose, Schema } from "mongoose";

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default model('Role', RoleSchema);