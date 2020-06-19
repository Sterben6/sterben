import { Router } from 'express';
const router = new Router();
import path from 'path';
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
    const caseid = req.params.caseId;
    const caseObj = await this.client.db.Case.findOne({caseId: caseid});
    if (!caseObj) return res.status(404);
})


module.exports = router;