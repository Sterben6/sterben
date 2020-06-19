// Importing express related modules
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon'
import cookeParser from 'cookie-parser';
import serverStatic from 'serve-static';
import helmet from 'helmet';
// Import utilities
import * as discord from 'discord.js';
import fs from 'fs-extra';
import * as moment from 'moment';
import Signale from 'signale';
import path from 'path';
// Import storage & DB libraries
import Redis from 'ioredis';
import mongoose from 'mongoose';
// Import internal items
// @ts-ignore
import config from '../../config.json'
import { Route } from '.'

export default class Server {
    public config: { token: string; mongoURL: string;}
    public app: express.Application;
    public client: discord.Client;
    public redis: Redis.Redis;
    public signale: Signale.Signale
    public routes: Map<string, Route>
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

        this.routes = new Map();
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
        this.app.set('view engine', 'html');
        this.app.use(express.static(path.join(process.cwd() + '/public')))
        this.app.use(bodyParser.json());
        this.app.get( "/", ( req, res ) => {
            res.send( "Hello world!" );
        });
        this.app.use(favicon(path.join(process.cwd(), 'img', 'favicon.ico')))
        this.app.listen(8123, () => {
            this.signale.success(`Server listening on port ${8123}`);
        })
        this.app.use('/jagc', require('../routes/jagc'));
    }

}