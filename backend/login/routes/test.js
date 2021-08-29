const router = require('express').Router();
let Test = require('../models/test.model');

router.route('/').get((req, res) => {
    Test.find()
        .then(test => res.json(test))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.duration);
    
    const newTest = new Test({
        username,
        description,
        duration,
        date,
    });

    newTest.save()
    .then(() => res.json('Test added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Test.findById(req.params.id)
        .then(test => res.json(test))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Test.findByIdAndDelete(req.params.id)
        .then(() => res.json('Test deleted!'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Test.findById(req.params.id)
        .then(test => {
            test.username = req.body.username;
            test.description = req.body.description;
            test.duration = Number(req.body.duration);
            test.date = Date.parse(req.body.date);

            test.save()
                .then(() => res.json('Test updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;