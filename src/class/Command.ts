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

    /**
     * - **0:** Everyone
     * - **1:** Associates+
     * - **2:** Core Team+
     * - **3:** Moderators, Supervisor, & Board of Directors
     * - **4:** Technicians, Supervisor, & Board of Directors
     * - **5:** Moderators, Technicians, Supervisor, & Board of Directors
     * - **6:** Supervisor+
     * - **7:** Board of Directors
     */
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
                return member.roles.cache.some((r) => ['709720483813392385', '709720224403816519', '709720523319541820', '709721377162395671', '709726951157530805', '709721648084942869'].includes(r));
            case 2:
                // @ts-ignore
                return member.roles.cache.some((r) => ['709720445410213889'].includes(r));
            case 3:
                // @ts-ignore
                return member.roles.cache.some((r) => ['696783944867250287', '709720701971726346','709720310789963797','709720408252874762'].includes(r));
            default:
                return false;
        }
    }
}