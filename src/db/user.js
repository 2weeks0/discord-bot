import mongoose from "mongoose";

const User = mongoose.model(
  "user",
  mongoose.Schema({
    name: "string",
    githubName: "string",
  })
);

export const saveUser = async (name, githubName, callback) => {
  const user = await User.findOne({githubName: githubName});
  console.log(user);
  if (user) {
    callback("등록 실패!! 이미 있는 githubName입니다!!");
    return;
  }

  const newUser = new User({ name, githubName });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(`등록 완료!! (name: ${name}, github_name: ${githubName})`);
  });
};

export const findAllUser = async (callback) => {
  const users = await User.find();
  users.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  let result = "";
  users?.forEach((it) => {
    result += `name: ${it.name}\n`;
    result += `id: ${it._id}\n`;
    result += `githubName: ${it.githubName}\n\n`;
  });

  callback?.(result);
  return users;
};

export const removeUser = (githubName) => {
  User.deleteOne({ githubName }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
