import { Router } from 'express';
const router = new Router();
import path from 'path';
import mongoose from 'mongoose';
import config from '../../config.json';
import { Case, CaseInterface } from "../models";

async function connect() {
    await mongoose.connect(config.mongoURL);

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
    await connect();
    const modelSchema = mongoose.model<CaseInterface>('Case', Case)

    const caseid = req.params.caseId;
    const caseObj = modelSchema.findOne({caseId: caseid});
    if (!caseObj) return res.status(404);
})


module.exports = router;