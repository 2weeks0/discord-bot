import mongoose from "mongoose";

const Commit = mongoose.model(
  "commit",
  mongoose.Schema({
    githubName: "string",
    timeStamp: "number",
    channelType: "string",
    description: "string",
  })
);

export const saveCommit = (commit, callback) => {
  const newCommit = new Commit(commit);
  newCommit.save((err, newCommit) => {
    if (err) {
      callback(err);
      return;
    }

    callback(JSON.stringify(newCommit));
  });
};
