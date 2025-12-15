module.exports = {
name: "8ball",
execute(message, args) {
if (!args.length) return message.reply("Ask a question.");
const answers = ["Yes", "No", "Maybe", "Definitely", "I don't think so", "Ask later"];
const answer = answers[Math.floor(Math.random() * answers.length)];
message.channel.send(`🎱 ${answer}`);
}
};