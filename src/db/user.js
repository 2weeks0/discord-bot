import mongoose from "mongoose";

const User = mongoose.model(
  "user",
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

export const findAllUser = async (callback) => {
  const users = await User.find();

  let result = "";
  users?.forEach((it) => {
    result += `name: ${it.name}\n`;
    result += `id: ${it._id}\n`;
    result += `githubName: ${it.githubName}\n\n`;
  });

  callback?.(result);
  return users;
};

export const removeUser = (id) => {
  User.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
