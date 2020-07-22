import { Route, Server } from "../class";

export default class Root extends Route {
    constructor(server: Server) {
        super(server);
        this.conf = {
            path: '/thing'
        };
    }

    public bind() {

        this.router.get('/thing', (req, res) => res.redirect('http://discord.gg/scproblox'))
    }
}