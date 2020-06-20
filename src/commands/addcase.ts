
import {Message, MessageEmbed, User} from 'discord.js';
import { Client, Command } from '../class';

export default class addCase extends Command {
    constructor(client: Client) {
        super(client);
        this.name = 'addcase';
        this.description = 'Adds a case to the case database.';
        this.usage = 'addcase [case number]';
        this.permissions = 2;
        this.enabled = true;
        this.guildOnly = true;
    }

    public async run(message: Message, args: string[]) {
        await message.delete();
        const embed = new MessageEmbed()
            .setTitle('Loading:')
            .setColor('YELLOW')
            .setFooter(`Request by ${message.author.username}#${message.author.discriminator}`)
            .setTimestamp()
        const filter = (m: { author: { id: string; }; }) => m.author.id == message.author.id;
        let status: boolean = true;
        const emsg =  await message.channel.send(embed);
        let defense: Array<User>;
        try {
            let caseId: string = args[0];
            const creatorId = message.author.id;
            if (!caseId) {
                embed.setColor('BLUE')
                embed.setTitle('Provide the Case Number.');
                await emsg.edit(embed)

                await message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time']})
                    .then(msg => {
                        if (msg.first().toString().toLowerCase().startsWith('cancel')) {
                            embed.setColor('ORANGE');
                            embed.setTitle('Command Cancelled:')
                            status = false;
                            emsg.edit(embed)
                        }
                        caseId = msg.first().toString();
                    })
                    .catch(c => {
                        if (!c) {
                            embed.setColor('RED');
                            embed.setTitle('Timed out.');
                            emsg.edit(embed)
                            status = false;
                        } else {
                            caseId = c.first().content();
                        }
                    })
            }
            if (!status) return;

            embed.setTitle('Please tag all members of the defense.');
            embed.setColor('BLUE')
            await emsg.edit(embed);
            await message.channel.awaitMessages(filter, {max: 1, time: 300000, errors: ['time']})
                .then(msg => {
                    if (msg.first().toString().toLowerCase().startsWith('cancel')) {
                        embed.setColor('ORANGE');
                        embed.setTitle('Command Cancelled:')
                        status = false;
                        emsg.edit(embed)
                    }
                    const people = msg.first().mentions.users;
                    people.forEach(p => {
                        defense.push(p)
                    })

                })

        } catch(error) {

        }
    }
}
