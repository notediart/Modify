module.exports = {
name: "warnings",
execute(message, args, client) {
const member = message.mentions.members.first();
if (!member) return message.reply("Mention someone.");

const warns = client.getWarns()[member.id] || [];
if (!warns.length) return message.channel.send("No warnings.");

const list = warns.map((w, i) => `${i + 1}. ${w.reason} — ${w.moderator}`).join("\n");
message.channel.send(`⚠ Warnings for ${member.user.tag}\n${list}`);
}
};
