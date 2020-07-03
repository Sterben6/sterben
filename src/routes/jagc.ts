import { Route, Server } from '../class';

export default class jagc extends Route {
    constructor(server: Server) {
        super(server, {path: '/jagc', deprecated: false, maintenance: false });
    }

    public bind() {
        this.router.get('/', async (req, res) => {
            try {

            } catch (error) {
                console.log(error)
            }
        });
        this.router.get('/api/cases/:caseId?', async (req, res) => {
            const caseid = req.params.caseId;
            const urlKey = req.query.apiKey;
            if (!urlKey) return res.status(400).json({code: '401', message: 'UNAUTHORIZED'});
            const keyObj = await this.server.parent.db.ApiKey.findOne({ApiKey: urlKey});
            const uses = keyObj.uses;
            await keyObj.updateOne({ $set: {'uses': uses+1}});
            if (!keyObj) return res.status(404).json({code: '401', message: 'UNAUTHORIZED'});
            if (!caseid) return res.status(400).json({code: '400', message: 'BAD_REQUEST'});
            const caseObj = await this.server.parent.db.Case.findOne({caseId: caseid});
            if (!caseObj) return res.status(404).json({code: '404', message: 'NOT_FOUND'});
            console.log(caseObj)
            await res.status(200).json({caseId: caseObj.caseId, creatorId: caseObj.creatorId, users: caseObj.users, charges: caseObj.charges})
        });
    }
}
