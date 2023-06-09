const { Client, Events, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const fs = require('node:fs');
const path = require('node:path');
const { channel } = require('node:diagnostics_channel');
require("dotenv").config();
const TOKEN = process.env.TOKEN;
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites]

});

client.commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
	try{
    await client.commands.get(interaction.commandName).execute(interaction, client);
	}
	catch(err){
		console.log(err);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: false });
	}
});


client.once(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
	connectDB(process.env.MONGO_URI);
});

client.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {
	if (newPresence.member.user.bot) return;
	if (newPresence.member.user.id != '352941142876225536') return;
	try{
	const room = "1116682855301533706";
	const channel = client.channels.cache.get(room);
	channel.send(`${newPresence.member.user.username} was __**${oldPresence.status}**__ and became__**${newPresence.status}__** at ${new Date().toLocaleString()}`);
	}catch(err){
		channel.send("There was an error but presenance was updated at "+new Date().toLocaleString());
		console.log(err);
	}
});

client.login(TOKEN);
