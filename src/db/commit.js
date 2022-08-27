import mongoose from "mongoose";
import { findAllUser } from "./user.js";
import config from "../../config.json" assert { type: "json" };

const Commit = mongoose.model(
  "commit",
  mongoose.Schema({
    githubName: "string",
    createdTimestamp: "string",
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

export const findCommitLog = async (min, max, callback) => {
  const users = await findAllUser();
  const commits = await Commit.find({
    createdTimestamp: {
      $gte: min,
      $lt: max,
    },
  });

  const channelTypes = Object.values(config.CHANNEL_TYPES);
  let result = "";
  channelTypes.forEach((type) => {
    result += `=== ${type} ===\n`;
    users.forEach((user) => {
      const commit = commits.find(
        (it) => it.channelType === type && it.githubName === user.githubName
      );

      result += `${user.name}: ${commit ? "O" : "X"}\n`;
    });
  });
  callback(result);
};
