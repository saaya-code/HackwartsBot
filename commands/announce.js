const { SlashCommandBuilder, Options, EmbedBuilder } = require('discord.js'); 


module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Announce a message to a channel'),
    async execute(interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You do not have permission to use this command!', { ephemeral: true });
        const embed = new EmbedBuilder()
            .setTitle('Welcome to Hackwarts!')
            .setDescription('Welcome, aspiring wizards and witches, to the magical world of coding and innovation!\n Step into the enchanting realm of the Harry Potter Hackathon, where your skills will be put to the ultimate test\n click </enter:1114534497564762182> to enter the magical world of Hackwarts!\na role and a private voice channel will be created under your house\'s category for you and your teammates.\nEnter your __team\'s name__ **not** the __house\'s name __(it\'s randomly selected) ')
            .setColor('#0099ff')
            .setFooter({ text: 'Made with ❤️ by saàya', iconURL: 'https://cdn.discordapp.com/avatars/398147766687236107/37aff03cdd4d18240e9c1696b405683f.png?size=1024' })
            .setThumbnail("https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png")
        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply('Announcement sent!', { ephemeral: true });
    }
}
            