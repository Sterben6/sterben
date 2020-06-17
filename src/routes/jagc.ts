import { Router } from 'express';
import express from 'express';
import { Case } from '../models';
const router = new Router();
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
router.get('/', function (next: () => void) {
    console.log('they went to jagc');
    // if you send here, next function won't be able to modify http headers
    // res.send('enjoy bitch')
    // next function tell express it needs to go to the next registered function for this path
    next()
});

router.use('/', express.static(process.cwd() + '/public/jagc'));

router.get('/active', function (req, res) {
    res.send('hi');
});


module.exports = router;