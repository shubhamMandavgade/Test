const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Person } = require('../models/person');


// => localhost:3000/person/
router.get('/', (req, res, next) => {
    Person.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);

        Person.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', (req, res, next) => {
    try {
        var per = new Person({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            mob_no: req.body.mob_no
        });
        per.save((err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);

        var per = {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            mob_no: req.body.mob_no
        };
        Person.findByIdAndUpdate(req.params.id, { $set: per }, { new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);

        Person.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;