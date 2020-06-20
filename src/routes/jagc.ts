import { Router } from 'express';
const router = new Router();
import path from 'path';
import mongoose from 'mongoose';
import config from '../../config.json';
import { Case, CaseInterface } from "../models";

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


router.get('/active', function (req, res) {
    res.send('hi');
});

router.get('/api/cases/:caseId', async (req, res) => {
    if (req.ip !== '73.136.46.75') return res.sendStatus(403);
    await connect();
    const modelSchema = Case;
    const caseid = req.params.caseId;
    const caseObj = await modelSchema.findOne({caseId: caseid});
    if (!caseObj) return res.sendStatus(404);
    console.log(caseObj)
})


module.exports = router;