import Server from './Server.js'
// Import utilities
import * as discord from 'discord.js';
import fs from 'fs-extra';
import * as moment from 'moment';
import Signale from 'signale';
// Import storage & DB libraries
import Redis from 'ioredis';
import mongoose from 'mongoose';
// Import internal items
// @ts-ignore
import config from '../config.json'
// Intents
const i = new discord.Intents(discord.Intents.ALL);
i.remove('GUILD_MESSAGE_TYPING','DIRECT_MESSAGE_TYPING','GUILD_VOICE_STATES','GUILD_MESSAGE_REACTIONS','GUILD_INVITES','GUILD_WEBHOOKS','GUILD_BANS');
console.log('1');
export default class Client extends discord.Client {
    public config: { token: string, prefix: string, mainGuild: string, mongoURL: string};
    public commands: discord.Collection<string, any>;
    public signale: Signale.Signale;
    public server: Server;
    public redis: Redis.Redis;

    constructor(options?: discord.ClientOptions) {
        super(options);
        this.commands = new discord.Collection();
        this.config = config;
        this.redis = new Redis();
        this.signale = Signale;
        this.server = new Server()
        this.signale.config({
            displayFilename: true,
            displayTimestamp: true,
            displayDate: true,
        });
    }

}
const client: Client = new Client({ partials: ['MESSAGE','CHANNEL','REACTION'], ws: { intents: i} });
client.login(this.config.token);
