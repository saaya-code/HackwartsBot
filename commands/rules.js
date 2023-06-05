const { SlashCommandBuilder, Options, EmbedBuilder } = require('discord.js'); 


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Announce rules message to a channel'),
    async execute(interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You do not have permission to use this command!', { ephemeral: true });
        const embed = new EmbedBuilder()
            .setTitle('The Rules of Hackwarts!')
            .setDescription("Spellbinding rules, enchanted journey!")
            .addFields({name: "Rule 1 :", value:"The submission of solutions won't be accepted after 6th of june, 2023, at __exactly 8pm ( 20h00 Tunisia's local time )__"})
            .addFields({name: "Rule 2 :", value:`all solutions must be submitted on 
            dscissatso@gmail.com , with a mail subjet composed by the Team_name and Name_of_challenge 
            Exemple : Subject : TeamGDSC - Branding Ticka \n__Note : solution submitted must be in an adaptable format, example : images (.png,.jpg,.jpeg,.ai,.ps,etc..) code (github link,codepen link,etc..)__`})
            .addFields({name: "Rule 3 :", value:"In case of multiple submissiosn of the same solution for a challenge by the same team, the last solution submitted will be taken as the final solution, however we recommend that you only submit your final version of your solution."})
            .setColor('#0099ff')
            .setFooter({ text: 'Made with ❤️ by saàya', iconURL: 'https://cdn.discordapp.com/avatars/398147766687236107/37aff03cdd4d18240e9c1696b405683f.png?size=1024' })
            .setThumbnail("https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png")
        await interaction.channel.send({ embeds: [embed] });
        await interaction.reply('Announcement sent!', { ephemeral: true });
    }
}
            