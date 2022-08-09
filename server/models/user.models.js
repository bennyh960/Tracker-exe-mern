const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      // uppercase: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.userName = this.userName[0].toUpperCase() + this.userName.slice(1).toLowerCase();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
