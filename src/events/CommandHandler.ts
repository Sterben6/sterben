import { Client, Event } from '../class';
import Discord, { Message, GuildChannel, NewsChannel } from "discord.js";

export default class CommandHandler extends Event {
    public client: Client;

    constructor(client: Client) {
        super(client)
        this.event = 'message';
    }

    // @ts-ignore
    public async run(message: Message) {
        if (message.author.bot || !message.content.startsWith(this.client.config.prefix)) return;
        const NAEmbed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('Error:')
            .setDescription(`${message.author}, an error has occurred, please contact the bot owner.`)
            .setTimestamp();
        const DisabledEmbed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('Error:')
            .setDescription(`${message.author}, the command you have requested is disabled. If you believe this is a mistake, contact the bot owner.`)
            .setTimestamp();
        const args = message.content.slice(this.client.config.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if (!this.client.commands.has(command)) return;
        const cmd = this.client.commands.get(command);
        if (cmd.guildOnly && (message.channel.type !== 'text')) return;
        if (!cmd.enabled) return message.channel.send(DisabledEmbed);
        if (!cmd.checkPermissions(message.member)) return;
        try {
            await cmd.run(message, args);
        } catch (err) {
            await message.channel.send(NAEmbed);
        }
    }
}