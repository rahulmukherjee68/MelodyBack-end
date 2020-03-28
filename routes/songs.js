'use strict';

var Song = require('../model/songs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    var new_song = new Song(req.body);
    if (!new_song.name) {

        res.status(400).json({ status:false, message: 'Please provide Name of Song' });

    }
    else{
        Song.createSong(new_song,(err,doc)=>{
            if(err)
            {
                res.status(400).json({status:false,message:err});
            }
            else{
                res.status(200).json({status:true,id:doc})
            }

        });
    }

});
module.exports = router;