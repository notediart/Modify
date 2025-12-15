// Keep-Alive Setup
const keepAlive = require('./server');
keepAlive();

 {
    console.log(`Logged in as ${client.user.tag}!`);
};

// ------------------------------------
// 3. Login using the Token Secret
// ------------------------------------
const token = process.env.DISCORD_BOT_TOKEN; 
client.login(token); 


// index.js
import Discord from 'discord.js';
import {Client, GatewayIntentBits, Collection} from "discord.js";
import fs from "fs";
import { v4 as uuidv4} from "uuid";
client.login(process.env.TOKEN);

// Commands
client.commands = new Collection();

// Warn system
const warnFile = "./data/warns.json";
if (!fs.existsSync(warnFile)) fs.writeFileSync(warnFile, JSON.stringify({}));

client.getWarns = () => JSON.parse(fs.readFileSync(warnFile, "utf8"));
client.saveWarns = warns => fs.writeFileSync(warnFile, JSON.stringify(warns, null, 2));

// Logging helpers
client.logMessage = msg => {
if (!config.logs.messages) return;
const channel = client.channels.cache.get(config.logs.messages);
if (channel) channel.send(msg);
};

client.logModeration = msg => {
if (!config.logs.moderation) return;
const channel = client.channels.cache.get(config.logs.moderation);
if (channel) channel.send(msg);
};

// Load commands
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));
for (const file of files) {
const command = require(`./commands/${folder}/${file}`);
client.commands.set(command.name, command);
}
}

// Ready
client.once("ready", () => {
console.log(`${config.botName} is online as ${client.user.tag}`);
});

// Command handler
client.on("messageCreate", async message => {
if (message.author.bot) return;
if (!message.content.startsWith(config.prefix)) return;

const args = message.content.slice(config.prefix.length).trim().split(/ +/);
const cmdName = args.shift().toLowerCase();

const command = client.commands.get(cmdName);
if (!command) return;

try {
await command.execute(message, args, client);
} catch (err) {
console.error(err);
message.reply("Something went wrong.");
}
});

// Warn buttons
client.on("interactionCreate", async interaction => {
if (!interaction.isButton()) return;

const parts = interaction.customId.split("_");
if (parts[0] !== "warn") return;

const action = parts[1];
const userId = parts[2];
const warnId = parts[3];

const warns = client.getWarns();
const userWarns = warns[userId] || [];
const warn = userWarns.find(w => w.id === warnId);

if (!warn) return interaction.reply({ content: "Warn not found.", ephemeral: true });

if (action === "info") {
return interaction.reply({
ephemeral: true,
content: `⚠ Warn Info\nModerator: ${warn.moderator}\nReason: ${warn.reason}\nTime: ${warn.time}`
});
}

if (action === "delete") {
if (!interaction.member.permissions.has("KickMembers")) {
return interaction.reply({ content: "No permission.", ephemeral: true });
}
warns[userId] = userWarns.filter(w => w.id !== warnId);
client.saveWarns(warns);
await interaction.message.delete();
client.logModeration(`❌ Warn deleted by ${interaction.user.tag}`);
}
});

// Message edit/delete logging
client.on("messageDelete", message => {
if (!message.guild || message.author?.bot) return;
client.logMessage(`🗑 Message deleted\nUser: ${message.author.tag}\nContent: ${message.content}`);
});

client.on("messageUpdate", (oldMsg, newMsg) => {
if (!newMsg.guild || newMsg.author?.bot) return;
if (oldMsg.content === newMsg.content) return;
client.logMessage(`✏ Message edited\nUser: ${newMsg.author.tag}\nBefore: ${oldMsg.content}\nAfter: ${newMsg.content}`);
});

client.login(process.env.TOKEN);
