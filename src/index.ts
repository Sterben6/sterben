// Import utilities
import * as discord from 'discord.js';
import fs from 'fs-extra';
import { parse } from 'yaml';
import { Client } from './class'
const i = new discord.Intents(discord.Intents.ALL);
i.remove('GUILD_MESSAGE_TYPING','DIRECT_MESSAGE_TYPING','GUILD_VOICE_STATES','GUILD_MESSAGE_REACTIONS','GUILD_INVITES','GUILD_WEBHOOKS','GUILD_BANS');
// Imports events & commands
// @ts-ignore
import * as eventFiles from './events';
// @ts-ignore
import * as commandFiles from './commands';
async function main(): Promise<void> {
    const read = await fs.readFile(process.cwd() + 'config.json', 'utf8');
    const config: { token: string, prefix: string, guildID: string, mongoDB: string, emailPass: string } = parse(read);
    const client: Client = new Client(config.token, { partials: ['MESSAGE','CHANNEL','REACTION'], ws: { intents: i} });

    await client.loadEvents(eventFiles);
    await client.loadCommands(commandFiles)
    await client.server.loadRoutes();
    await client.login()
}
main();
