const router = require('express').Router();
let Users = require('../models/user.model');

router.route('/').get((req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = Number(req.body.phoneNumber);
    const valueStream = req.body.valueStream;
    const scrumTeam = req.body.scrumTeam;
    const role = req.body.role;
    const technicalLead = req.body.technicalLead;
    const productOwner = req.body.productOwner;
    

    const newUser = new Users({
        username,
        email,
        phoneNumber,
        valueStream,
        scrumTeam,
        role,
        technicalLead,
        productOwner,
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Users.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(() => res.json('Users deleted!'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Users.findById(req.params.id)
        .then(users => {
            users.username = req.body.username;
            users.email = req.body.email;
            users.phoneNumber = Number(req.body.phoneNumber);
            users.valueStream = req.body.valueStream;
            users.scrumTeam = req.body.scrumTeam;
            users.role = req.body.role;
            users.technicalLead = req.body.technicalLead;
            users.productOwner = req.body.productOwner;
            users.notes = req.body.notes;

            users.save()
                .then(() => res.json('Users updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;