// Importing express related modules
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon'
import helmet from 'helmet';
// Import utilities
import * as discord from 'discord.js';
import Signale from 'signale';
import path from 'path';
import fs from 'fs-extra';
// Import storage & DB libraries
import Redis from 'ioredis';
// Import internal items
// @ts-ignore
import config from '../../config.json'
import { Client, Collection, Route } from '.';

export default class Server {
    public config: { token: string; mongoURL: string;}
    public app: express.Application;
    public client: discord.Client;
    public redis: Redis.Redis;
    public signale: Signale.Signale;
    public routes: Collection<Route>;
    public parent: Client;
    constructor(parent: Client) {
        this.parent = parent;
        this.config = config;
        this.redis = new Redis();
        this.app = express();
        this.signale = Signale;
        this.signale.config({
            displayFilename: true,
            displayTimestamp: true,
            displayDate: true,
        });

        this.routes = new Collection();
        this.client = new discord.Client();
        this.connect().then(() => {

        });
        this.loadRoutes().then(() => {

        });
    }

    private async loadRoutes(): Promise<void> {
        const routes = Object.values<typeof Route>(require('../routes'));
        for (const RouteFile of routes) {
            const route = new RouteFile(this)
            if (route.conf.deprecated) {
                route.deprecated();
            } else if (route.conf.maintenance) {
                route.maintenance();
            } else {
                route.init();
                route.bind();
            }
            this.parent.signale.success(`Successfully loaded route ${route.conf.path}.`);
            this.routes.add(route.conf.path, route);
            this.app.use(route.conf.path, route.router);
        }
        this.app.listen(8123)
    }
    private async connect() {
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
        this.app.set('view engine', 'jsx');
        this.app.engine('jsx', require('express-react-views').createEngine());
        this.app.use(express.static(path.join(process.cwd() + '/public')))
        this.app.use(bodyParser.json());
        this.app.get("/home", ( req, res ) => {
            res.sendFile(path.join(process.cwd() + '/public/index.html'))
        });
        this.app.get('/404', async (req, res) => {
            res.sendFile(path.join(process.cwd() + '/public/404.html'))
        })
        this.app.use(favicon(path.join(process.cwd() + '/img/favicon.ico')))
        this.app.listen(8123, () => {
            this.signale.success(`Server listening on port ${8123}`);
        })
        this.app.get('*', function(req, res){
            res.sendFile(path.join(process.cwd() + '/public/404.html'))
        });
    }

}
