import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import config from "../config.json" assert { type: "json" };
import { commands } from "./commands/index.js";
import mongoose from "mongoose";
import * as User from "./db/user.js";
import * as Commit from "./db/commit.js";

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(config.CLIENT_ID, "1012970128343846922"), {
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
    case "ping":
      await interaction.reply("Pong!" + name);
      return;

    case "사용자_등록":
      const name = interaction.options.get("name").value;
      const githubName = interaction.options.get("github_name").value;
      User.saveUser(
        name,
        githubName,
        async () =>
          await interaction.reply(`등록 완료!! (name: ${name}, github_name: ${githubName})`)
      );
      return;

    case "사용자_조회":
      User.findAllUser(
        async (users) => await interaction.reply(`사용자 조회!!\n${users || "사용자가 없다!"}`)
      );
      return;

    case "사용자_제거":
      const id = interaction.options.get("id").value;
      User.removeUser(id, async () => await interaction.reply("삭제 완료!!"));
      return;
  }
});

client.on("messageCreate", function (message) {
//   console.log(message);
  if (!message.author.bot || message.author.username !== "GitHub") {
    return;
  }

  //   console.log("messageCreate", message.embeds[0].data);
  const githubName = message.embeds[0].data.author.name;
  const timeStamp = message.createdTimestamp;
  const channelType = config.CHANNEL_TYPES[message.channelId];
  const description = message.embeds[0].data.description;

  Commit.saveCommit(
    {
      githubName,
      timeStamp,
      channelType,
      description,
    },
    async (commit) => await message.reply(`커밋 저장 완료!!\n${commit}`)
  );
});

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

client.login(config.BOT_TOKEN);
