const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const config = require("../../config");
module.exports = {
name: "warn",
async execute(message, args, client) {
if (!message.member.permissions.has("KickMembers")) return;
const member = message.mentions.members.first();
if (!member) return message.reply("Mention someone.");
const reason = args.slice(1).join(" ") || "No reason";

const warns = client.getWarns();
if (!warns[member.id]) warns[member.id] = [];

const warnId = uuidv4();
const warnData = { id: warnId, moderator: message.author.tag, reason, time: new Date().toLocaleString() };
warns[member.id].push(warnData);
client.saveWarns(warns);

const row = new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId(`warn_info_${member.id}_${warnId}`).setLabel("Warn Info").setStyle(ButtonStyle.Primary),
new ButtonBuilder().setCustomId(`warn_delete_${member.id}_${warnId}`).setLabel("Delete").setStyle(ButtonStyle.Danger)
);

await message.channel.send({ content: `⚠ ${member.user.tag} warned (${warns[member.id].length}/${config.autoMuteWarns})`, components: [row] });
client.logModeration(`⚠ Warn\nUser: ${member.user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`);

if (warns[member.id].length >= config.autoMuteWarns) {
const muted = message.guild.roles.cache.find(r => r.name === "Muted");
if (muted) {
await member.roles.add(muted);
message.channel.send(`🔇 ${member.user.tag} auto-muted (Reached ${config.autoMuteWarns} warns)`);
client.logModeration(`🔇 Auto-mute applied\nUser: ${member.user.tag}`);
}
}
}
};