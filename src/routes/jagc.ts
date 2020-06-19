import { Router } from 'express';
import express from 'express';
import { Case } from '../models';
const router = new Router();
import path from 'path';
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
const homePath = path.join(process.cwd() + '/public/jagc/home.html');
router.get('/', function (req, res, next) {
    res.sendFile(homePath);
    next()
})


router.get('/active', function (req, res) {
    res.send('hi');
});


module.exports = router;