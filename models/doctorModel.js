const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      index: true, // Add index for faster querying
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      index: true, // Add index for faster querying
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true, // Add index for faster querying
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      index: true, // Add index for faster querying
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      index: true, // Add index for faster querying
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "Fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Work timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
