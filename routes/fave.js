const express = require('express')
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.fave.findAll()
    .then(response => {
        res.render('fave', { faves: response})
    })
});

router.post('/', (req, res) => {
    let formData = req.body;
    db.fave.findOrCreate({
        where: { title: formData.title },
        defaults: { imdbid: formData.imdbid}
    })
    .then(([newFave, created]) => {
        console.log(`This was created: ${created}`);
        res.redirect('fave')


    })
    .catch(err => {
        console.log('Error', err)
    })

})


module.exports = router;