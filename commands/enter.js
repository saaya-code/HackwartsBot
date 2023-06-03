const House = require('../helpers/house.js');
const participant = require('../db/participant');
const griffindor = new House('Griffindor', '1114517196824133752', "https://www.pngkit.com/png/full/139-1390147_gryffindor-crest-harry-potter-gryffindor-logo-png.png", "#FF0000", "Where courage ignites!");
const ravenclaw = new House('Ravenclaw', '1114517413883555860', "https://www.pngkit.com/png/full/955-9550875_ravenclaw-sticker-hogwarts-house-crest-ravenclaw.png", "#0000FF", "Where wisdom soars!");
const hufflepuff = new House('Hufflepuff', '1114517321042628648', "https://www.pngkit.com/png/full/439-4398475_hogwarts-hufflepuff-crest-transparent-harry-potter-hufflepuff-crest.png", "#FFFF00", "Where friendship shines!");
const slytherin = new House('Slytherin', '1114517500391075861',"https://www.pngkit.com/png/full/106-1068382_hogwarts-sorting-quiz-harry-potter-slytherin-logo.png", "#00FF00", "Where ambition rules!");
const houses = [griffindor, ravenclaw, hufflepuff, slytherin];
const eventAnnouncementChannelID = "1114543108223406160";
const { SlashCommandBuilder, Options, EmbedBuilder } = require('discord.js'); 
const filter = (role) => role.id === griffindor.roleId || role.id === ravenclaw.roleId || role.id === hufflepuff.roleId || role.id === slytherin.roleId;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('enter')
        .setDescription('Join the Hackwarts!')
        .addStringOption(option =>
            option.setName('team')
                .setDescription('Enter your team\'s name here!')
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.member;
        if (member.roles.cache.some(filter)) {
            await interaction.reply({ content: 'You are already in a house!', ephemeral: true });
            return;
        }
        const random = Math.floor(Math.random() * houses.length);
        const house = houses[random];
        const role = interaction.guild.roles.cache.get(house.roleId);
        const generalRole = interaction.guild.roles.cache.get('1114517670772080710');
        await member.roles.add(generalRole);
        await member.roles.add(role);
        const embed = new EmbedBuilder()
            .setTitle('Welcome to Hackwarts!')
            .setDescription(`${member} you have been sorted into ${house.name}!`)
            .addFields({ name: `${house.name},`, value: house.slogan, inline: true })
            .setColor(house.color)
            .setThumbnail(house.image)
            .setFooter({ text: 'Hackworts 2023', iconURL: 'https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png', });
        await interaction.reply({ embeds: [embed], ephemeral: true });
        const channel = interaction.guild.channels.cache.get(eventAnnouncementChannelID);
        const descriptionMessage = interaction.options.getString('team') ? `${member} has joined the event under **${house.name}'s house**! They are on team **${interaction.options.getString('team')}**!` : `${member} has joined the event under **${house.name}'s house**!`;
        const announcementEmbed = new EmbedBuilder()
            .setTitle('New Student!')
            .setDescription(descriptionMessage)
            .setColor(house.color)
            .setThumbnail(house.image)
            .setFooter({ text: 'Hackworts 2023', iconURL: 'https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png', });
            await channel.send({ content: `${member}`, embeds: [announcementEmbed] });
            const newParticipant = new participant({
                discordId: member.id,
                house: house.name,
                team: interaction.options.getString('team') || "None"
            });
            //await newParticipant.save();    
            
    }
}