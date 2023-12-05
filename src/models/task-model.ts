import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    required: true
  }
}, { timestamps: true });

export const Task = model('task', TaskSchema);