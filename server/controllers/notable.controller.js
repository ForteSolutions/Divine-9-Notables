const Notable = require("../models/notable.model");

const createNewNotable = (req, res) => {
    Notable.create(req.body)
        .then((newNotable) => {
            res.json({ newNotable });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const getAllNotables = (req, res) => {
    Notable.find().sort({"name":1})
        .then((allNotables) => {
            res.json(allNotables);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const getOneNotable = (req, res) => {
    Notable.findOne({ _id: req.params.id })
        .then((queriedNotable) => {
            res.json(queriedNotable);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const updateNotable = (req, res) => {
    Notable.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedNotable) => {
            res.json({ updatedNotable });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const deleteNotable = (req, res) => {
    Notable.deleteOne({ _id: req.params.id })
    .then((deletedNotable) => {
            res.json({ deletedNotable });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

module.exports = { createNewNotable, getOneNotable, getAllNotables, updateNotable, deleteNotable };