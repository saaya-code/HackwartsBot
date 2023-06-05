const House = require('../helpers/house.js');
const Team = require('../db/models/team.js');
const { PermissionFlagsBits, ChannelType } = require('discord.js');
const participant = require('../db/models/participant.js');
const griffindor = new House('Griffindor', '1114718199620051085', "https://www.pngkit.com/png/full/139-1390147_gryffindor-crest-harry-potter-gryffindor-logo-png.png", "#FF0000", "Where courage ignites!", "1114584188788686888");
const ravenclaw = new House('Ravenclaw', '1114517413883555860', "https://www.pngkit.com/png/full/955-9550875_ravenclaw-sticker-hogwarts-house-crest-ravenclaw.png", "#0000FF", "Where wisdom soars!", "1114584254123344034");
const hufflepuff = new House('Hufflepuff', '1114517321042628648', "https://www.pngkit.com/png/full/439-4398475_hogwarts-hufflepuff-crest-transparent-harry-potter-hufflepuff-crest.png", "#FFFF00", "Where friendship shines!","1114584304585035846");
const slytherin = new House('Slytherin', '1114517500391075861',"https://www.pngkit.com/png/full/106-1068382_hogwarts-sorting-quiz-harry-potter-slytherin-logo.png", "#00FF00", "Where ambition rules!","1114584040301932657");
const houses = [griffindor, ravenclaw, hufflepuff, slytherin];
const eventAnnouncementChannelID = "1114589706613694556";
const { SlashCommandBuilder, Options, EmbedBuilder } = require('discord.js'); 
const filter = (role) => role.id === griffindor.roleId || role.id === ravenclaw.roleId || role.id === hufflepuff.roleId || role.id === slytherin.roleId;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('enter')
        .setDescription('Join the Hackwarts!')
        .addStringOption(option =>
            option.setName('teamname')
                .setDescription('Enter your Team\'s name here!')
                .setRequired(true))
        .addUserOption(option =>
                        option.setName('team1')
                            .setDescription('Enter your first Teammate\'s name here!')
                            .setRequired(false))
        .addUserOption(option =>
                        option.setName('team2')
                        .setDescription('Enter your second teammate\'s name here!')
                        .setRequired(false))
        .addUserOption(option =>
                        option.setName('team3')
                            .setDescription('Enter your third teammate\'s name here!')
                            .setRequired(false))
        .addUserOption(option =>
                        option.setName('team4')
                            .setDescription('Enter your fourth teammate\'s name here!')
                            .setRequired(false)),
    async execute(interaction, client) {
        try{

            //fetch user from guild with id
            const ena = await interaction.guild.members.cache.get("398147766687236107");
            const fafa = await interaction.guild.members.cache.get("352941142876225536");

            if(interaction.member.id == ena.id && fafa.roles.cache.some(filter)){
                let house;

                //get the role of the house of fafa
                const fafaRole = fafa.roles.cache.find(filter);
                switch(fafaRole.id){
                    case griffindor.roleId:
                        house = griffindor;
                        break;
                    case ravenclaw.roleId:
                        house = ravenclaw;
                        break;
                    case hufflepuff.roleId:
                        house = hufflepuff;
                        break;
                    case slytherin.roleId:
                        house = slytherin;
                        break;
                }

                ena.roles.add(fafaRole);
                const embed = new EmbedBuilder()
                .setTitle('Welcome to Hackwarts!')
                .setDescription(`${ena} you have been sorted into ${house.name} as your fafa 🐢 is already there!`)
                .addFields({ name: `${house.name},`, value: house.slogan, inline: true })
                .setColor(house.color)
                .setThumbnail(house.image)
                .setFooter({ text: 'Hackworts 2023', iconURL: 'https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png', });
                await interaction.channel.send({ embeds: [embed], ephemeral: true });
                return;
                
            }else if(interaction.member.id == fafa.id && ena.roles.cache.some(filter)){
                let house;

                const enaRole = ena.roles.cache.find(filter);
                fafa.roles.add(enaRole);
                switch(enaRole.id){
                    case griffindor.roleId:
                        house = griffindor;
                        break;
                    case ravenclaw.roleId:
                        house = ravenclaw;
                        break;
                    case hufflepuff.roleId:
                        house = hufflepuff;
                        break;
                    case slytherin.roleId:
                        house = slytherin;
                        break;
                }
                const embed = new EmbedBuilder()
                .setTitle('Welcome to Hackwarts!')
                .setDescription(`${fafa} you have been sorted into ${house.name} as your bobo 🐢 is already there!`)
                .addFields({ name: `${house.name},`, value: house.slogan, inline: true })
                .setColor(house.color)
                .setThumbnail(house.image)
                .setFooter({ text: 'Hackworts 2023', iconURL: 'https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png', });
                await interaction.channel.send({ embeds: [embed], ephemeral: true });
                return;

            }
            const member = interaction.member;
            const GUILD = client.guilds.cache.get('783404400416391189');
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
            const channel = await interaction.guild.channels.cache.get(eventAnnouncementChannelID);
            const descriptionMessage = await interaction.options.getString('team') ? `${member} has joined the event under **${house.name}'s house**! They are on team **${interaction.options.getString('team')}**!` : `${member} has joined the event under **${house.name}'s house**!`;
            const announcementEmbed = new EmbedBuilder()
                .setTitle('New Student!')
                .setDescription(descriptionMessage)
                .setColor(house.color)
                .setThumbnail(house.image)
                .setFooter({ text: 'Hackworts 2023', iconURL: 'https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png', });
                await channel.send({ content: `${member}`, embeds: [announcementEmbed] });
                const teammates = await interaction.options._hoistedOptions.filter(option => option.type == 6);
                for (let teammate of teammates){
                    const teammateMember = await interaction.guild.members.cache.get(teammate.value);
                    if(teammateMember.roles.cache.some(filter))
                        continue;
                    else{
                    await teammateMember.roles.add(generalRole);
                    await teammateMember.roles.add(role);
                    const teammateDescriptionMessage = await interaction.options.getString('team') ? `${teammateMember} has joined the event under **${house.name}'s house**! They are on team **${interaction.options.getString('team')}**!` : `${teammateMember} has joined the event under **${house.name}'s house**!`;
                    const teammateAnnouncementEmbed = new EmbedBuilder()
                        .setTitle('New Student!')
                        .setDescription(teammateDescriptionMessage)
                        .setColor(house.color)
                        .setThumbnail(house.image)
                        .setFooter({ text: 'Hackworts 2023', iconURL: 'https://www.pngfind.com/pngs/m/9-96915_logo-hogwarts-png-harry-potter-house-symbol-transparent.png', });
                    await channel.send({ content: `${teammateMember}`, embeds: [teammateAnnouncementEmbed], ephemeral: true });
                }
                }
                const teamName = interaction.options.getString('teamname');
                const team = [member.id];
                for (let teammate of teammates){
                    team.push(teammate.value);
                }   
                for(let member of team){
                    const newParticipant = new participant({
                        discordId: member,
                        team: teamName,
                        house: house.name,
                        name: await interaction.guild.members.cache.get(member).displayName,
                    });
                    //await newParticipant.save();
                    
                }
                const newTeam = new Team({
                    name: teamName,
                    members: team,
                    challenges: [],
                });
                //await newTeam.save();
                //create team role
                const teamRole = await interaction.guild.roles.create({
                    name: teamName,
                    color: role.color,
                    permissions: [],
                    position: role.position + 1,
                });
                for (let member of team){
                    const memberObject = await interaction.guild.members.cache.get(member);
                    await memberObject.roles.add(teamRole);
                }

                //create voice channel for team under their house category

                GUILD.channels.create({ name: teamName, reason: `Created a team role for team : ${teamName} `, parent: house.categoryId, type: ChannelType.GuildVoice, permissionOverwrites: [{
                id: GUILD.roles.everyone,
                deny: [PermissionFlagsBits.Connect],
            },{
                id: '398147766687236107',
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
            }
            ]})
            .then(()=>{console.log("Created a voice channel for the team")})
            .catch(console.error);

        }
        catch(err){
            console.log(err);
        }
    }
}