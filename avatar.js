module.exports = {
name: "avatar",
execute(message) {
const user = message.mentions.users.first() || message.author;
message.channel.send(user.displayAvatarURL({ size: 1024 }));
}
};