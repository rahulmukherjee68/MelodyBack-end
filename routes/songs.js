'use strict';

var Song = require('../model/songs');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'||file.mimetype === 'image/gif') {
        cb(null, true);
    }
    cb(null, false);
}
const upload = multer({
    storage: storage, limits: {
        fieldSize: 1024 * 1024 * 10
    },
    fileFilter:filter

});
router.post('/', upload.single('artwork'), (req, res, next) => {
    console.log(req.file);
    var myobj={
        name:req.body.name,
        date_of_release:req.body.date_of_release,
        image_file_path:req.file.path
    }
    var new_song = new Song(myobj);
    if (!new_song.name) {

        res.status(200).json({ status: false, message: 'Please provide Name of Song' });

    }
    else {
        Song.createSong(new_song, (err, doc) => {
            if (err) {
                res.status(200).json({ status: false, message: err });
            }
            else {
                res.status(200).json({ status: true, id: doc })
            }

        });
    }

});
module.exports = router;