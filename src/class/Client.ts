import { Server, Event, Collection,Command } from '.'
// Import utilities
import * as discord from 'discord.js';
import Signale from 'signale';
// Import storage & DB libraries
import Redis from 'ioredis';
import mongoose from 'mongoose';
// Import internal items
// @ts-ignore
import config from '../../config.json'
import { Case, CaseInterface } from "../models";
// Intents
const i = new discord.Intents(discord.Intents.ALL);
i.remove('GUILD_MESSAGE_TYPING','DIRECT_MESSAGE_TYPING','GUILD_VOICE_STATES','GUILD_MESSAGE_REACTIONS','GUILD_INVITES','GUILD_WEBHOOKS','GUILD_BANS');

export default class Client extends discord.Client {
    public config: { token: string, prefix: string, mainGuild: string, mongoURL: string};
    public commands: discord.Collection<string, any>;
    public events: Collection<Event>;
    public signale: Signale.Signale;
    public server: Server;
    public redis: Redis.Redis;
    public db: { Case: mongoose.Model<CaseInterface>};

    constructor(token: string, options?: discord.ClientOptions) {
        // @ts-ignore
        super(token, options);
        this.commands = new discord.Collection();
        this.events = new Collection<Event>();
        this.config = config;
        this.redis = new Redis();
        this.db = { Case }
        this.signale = Signale;
        this.server = new Server()
        this.signale.config({
            displayFilename: true,
            displayTimestamp: true,
            displayDate: true,
        });
    }

    public async loadDatabase() {
        await mongoose.connect(this.config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true})
    }

    public async loadEvents(eventFiles: { ready; CommandHandler }) {
        const evtFiles = Object.entries<typeof Event>(eventFiles);
        for (const [name, Ev] of evtFiles) {
            const event = new Ev(this);
            this.events.add(event.event, event);
            // @ts-ignore
            this.on(event.event, event.run);
            this.signale.success(`Successfully loaded event: ${name}`);
            delete require.cache[require.resolve(`${__dirname}/../events/${name}`)];
        }

    }

    public async loadCommands(commandFiles: { [s: string]: typeof Command; } | ArrayLike<typeof Command>) {
        const cmdFiles = Object.values<typeof Command>(commandFiles);
        for (const Cmd of cmdFiles) {
            const command = new Cmd(this);
            this.commands.set(command.name, command);
            this.signale.success(`Successfully loaded command: ${command.name}`);
        }
    }

};