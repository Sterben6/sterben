import { Router } from 'express';
const router = new Router();
import path from 'path';
import mongoose from 'mongoose';
import config from '../../config.json';
import { Case, ApiKey } from "../models";

async function connect() {
    await mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true});

}
const forceAuth = (req, res) => {
    if (!req.session.user) return res.redirect('/')
}
const homePath = path.join(process.cwd() + '/public/jagc/home.html');
router.get('/', function (req, res) {
    res.sendFile(homePath);
})


router.get('/active', forceAuth, function (req, res) {
    res.send('hi');
});

router.get('/api/cases/:caseId?apiKey', async (req, res) => {
    await connect();
    const caseid = req.params.caseId;
    const urlKey = req.query.apiKey;
    if (!urlKey) return res.status(400).json({code: '401', message: 'UNAUTHORIZED'});
    const keyObj = await ApiKey.findOne({ApiKey: urlKey});
    if (!keyObj) return res.status(404).json({code: '401', message: 'UNAUTHORIZED'});
    if (!caseid) return res.status(400).json({code: '400', message: 'BAD_REQUEST'});
    const caseObj = await Case.findOne({caseId: caseid});
    if (!caseObj) return res.status(404).json({code: '404', message: 'NOT_FOUND'});
    console.log(caseObj)
    await res.status(200).json({caseId: caseObj.caseId, creatorId: caseObj.creatorId, users: caseObj.users, charges: caseObj.charges})
});




module.exports = router;