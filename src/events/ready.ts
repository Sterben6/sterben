import { Client, Event } from '../class';

export default class Ready extends Event {
    public client: Client;

    constructor(client: Client) {
        super(client);
        this.event = 'ready';
    }

    public async run() {
        this.client.signale.start(`${this.client.user.username} is now ready!\nServers: ${this.client.guilds.cache.size}\nUsers: ${this.client.users.cache.size}`);
        this.client.on('error', (err) => {

        });
        process.on('uncaughtException', (err) => {
            process.exit(1);
        });
        process.on('unhandledRejection', (err: Error) => {

        });
    }
}
