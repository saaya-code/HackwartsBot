const { SlashCommandBuilder, Options, EmbedBuilder } = require('discord.js'); 


module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Announce a message to a channel'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Welcome to Hackwarts!')
            .setDescription('Welcome, aspiring wizards and witches, to the magical world of coding and innovation!\n Step into the enchanting realm of the Harry Potter Hackathon, where your skills will be put to the ultimate test\n click </enter:1114534497564762182> to enter the magical world of Hackwarts!\nArole and a private voice channel will be created under your house\'s category for you and your teammates.')
            .setColor('#0099ff')
            .setFooter({ text: 'Made with ❤️ by saàya', iconURL: 'https://cdn.discordapp.com/avatars/398147766687236107/37aff03cdd4d18240e9c1696b405683f.png?size=1024' })
            .setThumbnail("https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png")
        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply('Announcement sent!', { ephemeral: true });
    }
}
            