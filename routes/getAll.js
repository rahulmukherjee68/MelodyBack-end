'use strict';

var Song = require('../model/songs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {


    Song.getTopTenSongs(true, (err, doc) => {
        if (err) {
            res.status(400).json({ status: false, message: err });
        }
        else {
            res.status(200).json({status:true, id: doc })
        }

    });


});
module.exports = router;