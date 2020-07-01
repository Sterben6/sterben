import { Route, Server } from '../class';

export default class RoTech extends Route {
    constructor(server: Server) {
        super(server, {authOnly: false, path: '/rotech', deprecated: false, maintenance: false });
    }

    public bind() {
        this.router.get('/', async (req, res) => {
            try {
                res.redirect('https://discord.gg/GCcbAeZ');
            } catch (error) {
                this.handleError(error, res);
            }
        });
    }
}
