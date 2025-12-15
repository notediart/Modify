module.exports = {
name: "serverinfo",
execute(message) {
message.channel.send(`Server: ${message.guild.name}\nMembers: ${message.guild.memberCount}`);
}
};