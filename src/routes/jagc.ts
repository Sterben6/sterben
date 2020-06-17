import { Router } from 'express';
import express from 'express';
import { Case } from '../models';
const router = new Router();
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
router.get('/', function (req, res) {
    console.log('they went to jagc');
    res.render(process.cwd() + '/public/jagc/home.html', function (err, html) {
        res.send('enjoy bitch')
    })
    // res.send('enjoy bitch')

});

router.get('/active', function (req, res) {

});


module.exports = router;