import { Route, Server } from "../class";

export default class Root extends Route {
    constructor(server: Server) {
        super(server);
        this.conf = {
            path: '/'
        };
    }

    public bind() {

        this.router.get('/', (req, res) => res.redirect('http://discord.gg/scproblox'))
    }
}