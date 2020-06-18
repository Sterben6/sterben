import { Router } from 'express';
import express from 'express';
import { Case } from '../models';
const router = new Router();
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
router.get('/', function (res, next: () => void) {
    res.sendfile(process.cwd() + '/public/jagc/home.html')
});


router.get('/active', function (req, res) {
    res.send('hi');
});


module.exports = router;