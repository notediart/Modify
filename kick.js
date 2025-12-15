module.exports = {
name: "kick",
async execute(message, args, client) {
if (!message.member.permissions.has("KickMembers")) return;
const member = message.mentions.members.first();
if (!member) return message.reply("Mention someone.");
await member.kick();
message.channel.send(`👢 ${member.user.tag} kicked.`);
client.logModeration(`👢 Kick\nUser: ${member.user.tag}\nModerator: ${message.author.tag}`);
}
};
