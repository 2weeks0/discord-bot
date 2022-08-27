import mongoose from "mongoose";

const User = mongoose.model(
  "Schema",
  mongoose.Schema({
    name: "string",
    githubName: "string",
  })
);

export const saveUser = (name, githubName, callback) => {
  const newUser = new User({ name, githubName });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });
};

export const findAllUser = (callback) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
      return;
    }
    let result = "";
    users?.forEach((it) => {
        result += `name: ${it.name}\n`;
        result += `id: ${it._id}\n`;
        result += `githubName: ${it.githubName}\n\n`;
    })
    callback(result);
  });
};

export const removeUser = (id) => {
  User.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
