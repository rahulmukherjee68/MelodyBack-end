'use strict';

var Song = require('../model/songs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    var id = req.body.id;
    var total_rating = req.body.total_rating;
    var total_users_rated = req.body.total_users_rated;
    if (!id) {
        res.status(400).json({ status: false, message: 'Update Id Not Provided' });
    }
    else {
        Song.getSongById(id, (err, doc) => {
            if (err) {
                res.status(400).json({ status: false, message: err });

            }
            else {

                total_rating = total_rating + doc[0].total_rating;

                total_users_rated = total_users_rated + doc[0].total_users_rated;

                var new_update = { 
                    id: id, 
                    total_rating: total_rating,
                     total_users_rated: total_users_rated,
                     rating:parseFloat((total_rating/total_users_rated).toFixed(2))
                     };
                Song.updateSongById(new_update, (err, doc) => {
                    if (err) {
                        res.status(400).json({ status: false, message: err });
                    }
                    else {
                        res.status(200).json({
                            status: true,
                            doc: doc
                        })
                    }

                });
            }
        })
    }
});

module.exports = router;




