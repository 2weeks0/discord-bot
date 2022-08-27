import { SlashCommandBuilder } from "discord.js";

export const commands = [
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
      option.setName("github_name").setDescription("Github Name을 입력하자!").setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("커밋_정산")
    .setDescription("날짜를 입력하고 하루를 정산하자!")
    .addStringOption((option) =>
      option.setName("date").setDescription("년/월/일을 입력하자! (예) 2022-8-27").setRequired(false)
    ),
].map((it) => it.toJSON());
