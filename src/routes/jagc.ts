import { Router } from 'express';
import express from 'express';
import { Case } from '../models';
const router = new Router();
import path from 'path';
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
const homePath = path.join(process.cwd() + '/public/jagc/home')
router.get('/', function (req, res) {
    res.render(homePath, function(err, html) {
        res.send(html)
        })
})


router.get('/active', function (req, res) {
    res.send('hi');
});


module.exports = router;