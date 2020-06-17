// Importing express related modules
import express from 'express';
import bodyParser from 'body-parser';
import cookeParser from 'cookie-parser';
import helmet from 'helmet';
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
console.log('1')
export default class Server {
    public config: { token: string; mongoURL: string;}
    public app: express.Application;
    public client: discord.Client;
    public redis: Redis.Redis;
    public signale: Signale.Signale
    constructor() {
        this.config = config;
        this.redis = new Redis();
        this.app = express();
        this.signale = Signale;
        this.signale.config({
            displayFilename: true,
            displayTimestamp: true,
            displayDate: true,
        });

        this.client = new discord.Client();
        this.connect()
    }
    private connect() {
        /*
        mongoose.connect(this.config.mongoURL, {

        });
         */
        console.log('2')
        this.client.login(this.config.token).then(r => {
            console.log(this.config.token == r)
        });
        this.app.set('trust proxy', 'loopback');
        this.app.use(helmet({
            hsts: false,
            hidePoweredBy: false,
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                },
            },
            }));
        this.app.use(bodyParser.json());
        this.app.get( "/", ( req, res ) => {
            res.send( "Hello world!" );
        } );
        this.app.listen(8123, () => {
            this.signale.success(`Server listening on port ${8123}`);
        })

    }
}