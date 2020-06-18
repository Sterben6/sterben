import { Router } from 'express';
import express from 'express';
import { Case } from '../models';
const router = new Router();
import path from 'path';
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
router.get('/', function (res: { render: (s: string) => void;
    send(html: any): void;
}, next: () => void) {
    // @ts-ignore
    res.render(path.join(process.cwd() + '/public/jagc/home.html'), function (err, html): void {
        if (err) return console.log(err);
        res.send(html)
    })
});


router.get('/active', function (req, res) {
    res.send('hi');
});


module.exports = router;