import { Router } from 'express';

const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
}
Router.get('/', (req, res) => {
    console.log('they went to jagc');
    res.send('enjoy bitch')
});
