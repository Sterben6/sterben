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

});

router.use('/', express.static(process.cwd() + '/public/jagc'));
router.get('/active', function (req, res) {
    res.send('hi');
});


module.exports = router;