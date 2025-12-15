module.exports = {
name: "addmutedrole",
async execute(message) {
if (!message.member.permissions.has("ManageRoles")) return;
let role = message.guild.roles.cache.find(r => r.name === "Muted");
if (role) return message.reply("Muted role already exists.");

role = await message.guild.roles.create({
name: "Muted",
color: "#555555",
permissions: []
});

message.guild.channels.cache.forEach(async channel => {
await channel.permissionOverwrites.create(role, {
SendMessages: false,
AddReactions: false,
Speak: false
});
});

message.channel.send("✅ Muted role created and configured.");
}
};
