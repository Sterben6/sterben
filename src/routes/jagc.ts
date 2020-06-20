import { Router } from 'express';
const router = new Router();
import path from 'path';
import mongoose from 'mongoose';
import config from '../../config.json';
import { Case } from "../models";

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

router.get('/api/cases/:caseId', async (req, res) => {
    // if (req.ip !== '73.136.46.75') return res.sendStatus(403);
    await connect();
    const caseid = req.params.caseId;
    const caseObj = await Case.findOne({caseId: caseid});
    if (!caseObj) return res.status(404).json({code: '404', message: 'NOT_FOUND'});
    console.log(caseObj)
});




module.exports = router;