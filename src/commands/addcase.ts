
import { Message } from 'discord.js';
import { Client, Command } from '../class';

export default class addCase extends Command {
    constructor(client: Client) {
        super(client);
        this.name = 'addcase';
        this.description = 'Adds a case to the case database.';
        this.usage = 'addcase [case number]';
        this.permissions = 2;
        this.enabled = true;
    }

    public async run(message: Message, args: string[]) {
        try {

        } catch(error) {

        }
    }
}
