module.exports = {
name: "unmute",
async execute(message, args, client) {
if (!message.member.permissions.has("ManageRoles")) return;
const member = message.mentions.members.first();
if (!member) return message.reply("Mention someone.");
const role = message.guild.roles.cache.find(r => r.name === "Muted");
if (!role) return message.reply("Muted role not found.");
await member.roles.remove(role);
message.channel.send(`🔊 ${member.user.tag} unmuted.`);
client.logModeration(`🔊 Unmute\nUser: ${member.user.tag}\nModerator: ${message.author.tag}`);
}
};