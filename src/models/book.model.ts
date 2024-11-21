import { model, Schema } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  discountedPrice: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default model('Book', BookSchema);