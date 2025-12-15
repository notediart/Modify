module.exports = {
name: "mute",
async execute(message, args, client) {
if (!message.member.permissions.has("ManageRoles")) return;
const member = message.mentions.members.first();
if (!member) return message.reply("Mention someone.");
const role = message.guild.roles.cache.find(r => r.name === "Muted");
if (!role) return message.reply("Muted role not found.");
await member.roles.add(role);
message.channel.send(`🔇 ${member.user.tag} muted.`);
client.logModeration(`🔇 Mute\nUser: ${member.user.tag}\nModerator: ${message.author.tag}`);
}
};