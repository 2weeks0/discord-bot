import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import config from "./config/index.js";
import { commands } from "./commands/index.js";
import mongoose from "mongoose";
import * as User from "./db/user.js";
import * as Commit from "./db/commit.js";

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(config.CLIENT_ID, config.SERVER_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  //   console.log(interaction);
  if (!interaction.isChatInputCommand()) {
    return;
  }

  switch (interaction.commandName) {
    case "사용자_등록":
      const name = interaction.options.get("name").value;
      const githubName = interaction.options.get("github_name").value;
      User.saveUser(name, githubName, async (msg) => await interaction.reply(msg));
      return;

    case "사용자_조회":
      User.findAllUser(
        async (users) => await interaction.reply(`사용자 조회!!\n${users || "사용자가 없다!"}`)
      );
      return;

    case "사용자_제거":
      User.removeUser(
        interaction.options.get("github_name").value,
        async () => await interaction.reply("삭제 완료!!")
      );
      return;

    case "커밋_정산":
      const date = interaction.options.get("date")?.value;
      const min = date ? new Date(date) : new Date();
      min.setHours(6);
      const max = date ? new Date(date) : new Date();
      max.setDate(min.getDate + 1);
      max.setHours(6);
      Commit.findCommitLog(
        min.toTimeString(),
        max.toTimeString(),
        async (logs) => await interaction.reply(`${min.toLocaleDateString()} 정산!!\n${logs}`)
      );
      return;
  }
});

client.on("messageCreate", async function (message) {
  //   console.log(message);
  if (!message.author.bot || message.author.username !== "GitHub") {
    return;
  }

  //   console.log("messageCreate", message.embeds[0].data);
  const githubName = message.embeds[0].data.author.name;
  const createdTimestamp = message.createdTimestamp;
  const channelType = config.CHANNEL_TYPES[message.channelId];
  const description = message.embeds[0].data.description;

  Commit.saveCommit(
    {
      githubName,
      createdTimestamp,
      channelType,
      description,
    },
    async () => await message.react("<:bono:1013334314626326528>")
  );
});

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

client.login(config.BOT_TOKEN);
