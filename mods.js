module.exports = {
name: "mods",
execute(message) {
const mods = message.guild.members.cache.filter(m =>
m.permissions.has("KickMembers") ||
m.permissions.has("BanMembers") ||
m.permissions.has("Administrator")
);
if (!mods.size) return message.reply("No moderators found.");
const list = mods.map(m => `• ${m.user.tag}`).join("\n");
message.channel.send(`🛡 Moderation Team:\n${list}`);
}
};