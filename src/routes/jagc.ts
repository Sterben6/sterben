import { Route } from '../class';
import { Server } from '../class';

export default class jagc extends Route {
    constructor(server: Server) {
        super(server, {path: '/jagc', authOnly: true, deprecated: false, maintenance: false})
    }

    public bind() {
        this.router.post('/active', async (req, res) => {
            res.send('you got this !!!!')
        })
    }
}