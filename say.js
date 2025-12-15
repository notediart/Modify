module.exports = {
name: "say",
execute(message, args) {
if (!args.length) return;
message.delete();
message.channel.send(args.join(" "));
}
};
