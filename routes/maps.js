'use strict';

var Map = require('../model/map');
const express = require('express');
const router = express.Router();

async function addMap(song_id, artists, res) {
    var i = 0;
    var j = 0;

    for (i = 0; i < artists.length; i++) {
        var obj = { song_id: song_id, artist_id: artists[i].id };
        var new_map = new Map(obj);
        if (!new_map.song_id) {

            res.status(400).json({ status: false, message: 'Id Of artist or Song not provided in body' });

        }
        else {
            j = j + 1;
            var result = await Map.createMap(new_map, async (err, doc) => {
                if (err) {
                    res.status(400).json({ status: false, message: err });
                }
                else {
                    if (doc) {
                        if (doc) {
                            
                        }
                    }
                }

            });
            
        }
    }

    if (j === artists.length) {
        return (true)
    }
    else {
        return (false)
    }
}

router.post('/', (req, res, next) => {
    var song_id = req.body.id;
    var artists = req.body.artist;
    addMap(song_id, artists, res).then(doc => {
        if (doc) {
            res.status(200).json({ status: true, message: "Record Saved!" });
        }
        else {
            res.status(200).json({ status: true, message: "Some Records are not saved" });
        }
    })



});
module.exports = router;