import { SlashCommandBuilder } from "discord.js";

export const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("사용자_등록")
    .setDescription("Github ID를 등록하자!")
    .addStringOption((option) =>
      option.setName("name").setDescription("이름을 입력하자!").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("github_name")
        .setDescription("Github Name을 입력하자! (@ 앞에만!!)")
        .setRequired(true)
    ),
  new SlashCommandBuilder().setName("사용자_조회").setDescription("등록된 사용자를 조회하자!"),
  new SlashCommandBuilder()
    .setName("사용자_제거")
    .setDescription("사용자를 제거하자!")
    .addStringOption((option) =>
      option.setName("id").setDescription("id를 입력하자!").setRequired(true)
    ),
].map((it) => it.toJSON());
