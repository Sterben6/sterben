
import {Message, MessageEmbed} from 'discord.js';
import { Client, Command } from '../class';
import crypto from 'crypto';

export default class addKey extends Command {
    constructor(client: Client) {
        super(client);
        this.name = 'addkey';
        this.description = 'Creates a new apikey';
        this.usage = 'addkey <user>';
        this.permissions = 4;
        this.enabled = true;
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
        const date = new Date();
        if (!args[0]) return;
        const uuid = crypto.randomBytes(20).toString('hex');
        const baseID = Buffer.from(message.author.id).toString('hex');
        const apikey = `${uuid}-${baseID}`;
        const newApi = new this.client.db.ApiKey({
            ApiKey: apikey,
            user: message.mentions.users.first().id,
            creator: message.author.id,
            uses: 0,
            status: true,
            date: date
        })
        await newApi.save();

        embed.setColor('GREEN')
        embed.setTitle('Success:')
        await emsg.edit(embed)
    }
}
