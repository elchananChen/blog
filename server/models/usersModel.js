import mongoose from "mongoose";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    enum: ["IL", "HU", "RO", "US", "RU"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (input) {
        const phoneNumber = parsePhoneNumberFromString(input, this.country);
        return phoneNumber && phoneNumber.isValid();
      },
      message: `phone number dosn't match country code`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//todo: virtual filed for fullName

export default mongoose.model("User", userSchema);
