module.exports = {
name: "clear",
async execute(message, args, client) {
if (!message.member.permissions.has("ManageMessages")) return;
const amount = parseInt(args[0]);
if (!amount) return message.reply("Provide number of messages.");
await message.channel.bulkDelete(amount + 1);
message.channel.send(`🧹 Cleared ${amount} messages.`).then(msg => setTimeout(() => msg.delete(), 3000));
client.logModeration(`🧹 Cleared ${amount} messages\nBy: ${message.author.tag}`);
}
};
