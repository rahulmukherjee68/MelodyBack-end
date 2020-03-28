'use strict';

var Map = require('../model/map');
const express = require('express');
const router = express.Router();



router.post('/', (req, res, next) => {
    var new_map = new Map(req.body);
    if (!new_map.song_id) {

        res.status(400).json({ status: false, message: 'Id Of artist or Song not provided in body' });

    }
    else {
        Map.createMap(new_map, (err, doc) => {
            if (err) {
                res.status(400).json({ status: false, message: err });
            }
            else {
                res.status(200).json({ status: true, id: doc })
            }

        });
    }

});
module.exports = router;