const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    default: "",
    match: [/.+\@.+\..+/, "Invalid email"],
    trim: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash password if modified
  if (!user.isModified("password")) {
    return next();
  }

  // salt and hash password
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.isPasswordValid = (password, prevPassword, cb) => {
  console.log(password);
  console.log(prevPassword);
  bcrypt.compare(password, prevPassword, cb);
}; 

const User = mongoose.model("User", UserSchema);

module.exports = User;
