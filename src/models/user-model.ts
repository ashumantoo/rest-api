import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  gender: {
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: false
  },
  address: {
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    zipcode: {
      type: String,
      required: false
    }
  },
  profilePhoto: {
    type: String,
    required: false,
    default: "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
  },
  profession: {
    type: String,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Role"
  }
});

export default model('User', UserSchema);