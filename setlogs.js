const config = require("../../config");

module.exports = {
name: "setlogs",
execute(message, args) {
if (!message.member.permissions.has("Administrator")) return;

const type = args[0];
const channel = message.mentions.channels.first();

if (!type || !channel) return message.reply("Usage: !setlogs <message|moderation> #channel");

if (type === "message") config.logs.messages = channel.id;
if (type === "moderation") config.logs.moderation = channel.id;

message.channel.send(`✅ ${type} logs set to ${channel}`);
}
};