import { GuildMember, Message } from 'discord.js';
import { Client } from '.';

export default class Command {
    public client: Client;

    /**
     * The name of the command
     */
    public name: string;
    /**
     * The description for the command.
     */

    public description: string;

    /**
     * Usage for the command.
     */
    public usage: string;
    /**
     * The aliases for the command.
     */

    public aliases: string[];


    public permissions: number;

    /**
     * Determines if the command is only available in server.
     */
    public guildOnly: boolean;

    /**
     * Determines if the command is enabled or not.
     */
    public enabled: boolean;

    public run(message: Message, args: string[]): Promise<any> {
        return Promise.resolve();
    }

    constructor(client: Client) {
        this.client = client;

        this.aliases = [];
    }

    public checkPermissions(member: GuildMember): boolean {
        if (member.id === '241361691730903040') return true;
        switch (this.permissions) {
            case 0:
                return true;
            case 1:
                // @ts-ignore
                return member.roles.cache.some((r) => ['707065690204536943','707065798581026836','707279018746970204'].includes(r));
            case 2:
                // @ts-ignore
                return member.roles.cache.some((r) => ['707065798581026836','707279018746970204'].includes(r));
            case 3:
                // @ts-ignore
                return member.roles.cache.some((r) => ['707279018746970204'].includes(r));
            default:
                return false;
        }
    }
}