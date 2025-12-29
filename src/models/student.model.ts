import { model, Schema } from "mongoose";

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  rollNumber: {
    type: Number,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: false
  },
  gardianDetails: {
    gardianFullName: {
      type: String,
      required: true
    },
    gardianEmail: {
      type: String,
      required: true,
      email: true,
      lowercase: true
    },
    gardianMobile: {
      type: String,
      required: true
    },
    relationWithGardian: {
      type: String,
      required: true,
      enum: ["FATHER", "MOTHER", "GRAND_FATHER", "GRAND_MOTHER", "UNCLE", "AUNTY", "BROTHER", "SISTER",]
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE"]
  },
  dob: {
    type: Date,
    required: true
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
  schoolDetails: {
    schoolName: {
      type: String,
    },
    schoolEmail: {
      type: String,
      lowercase: true
    },
    schoolMobile: {
      type: String
    }
  },
  profilePhoto: {
    type: String,
    required: false,
    default: "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
  },
  isHandicapped: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default model('Student', StudentSchema);