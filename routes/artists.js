'use strict';

var Artist = require('../model/artists');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    var new_artist = new Artist(req.body);
    if (!new_artist.name) {

        res.status(200).json({ status:false, message: 'Please provide Name of Artist' });

    }
    else{
        Artist.createArtist(new_artist,(err,doc)=>{
            if(err)
            {
                res.status(200).json({status:false,message:err});
            }
            else{
                res.status(200).json({status:true,id:doc})
            }

        });
    }

})
.get('/artist',(req,res,next)=>{
    Artist.getAllArtist(true,(err,doc)=>{
        if(err)
        {
            res.status(200).json({status:false,message:err});
   
        }
        else
        {
            
            res.status(200).json({status:true,doc:doc})
        }
    });
})
.get('/getArtistByName',(req,res,next)=>{

});

module.exports = router;