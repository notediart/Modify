module.exports = {
name: "coinflip",
execute(message) {
const result = Math.random() < 0.5 ? "Heads" : "Tails";
message.channel.send(`🪙 Coin flip: **${result}**`);
}
};
