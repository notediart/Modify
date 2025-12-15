module.exports = {
name: "ban",
async execute(message, args, client) {
if (!message.member.permissions.has("BanMembers")) return;
const member = message.mentions.members.first();
if (!member) return message.reply("Mention someone.");
const reason = args.slice(1).join(" ") || "No reason";
await member.ban({ reason });
message.channel.send(`🔨 ${member.user.tag} banned.`);
client.logModeration(`🔨 Ban\nUser: ${member.user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`);
}
};
