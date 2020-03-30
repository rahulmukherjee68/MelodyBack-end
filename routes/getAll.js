'use strict';

var Song = require('../model/songs');
var Artist = require('../model/artists');

const express = require('express');
const router = express.Router();

let recursiveFunction = async function (arr, x, start, end) {

    // Base Condition 
    if (start > end) return false;

    // Find the middle index 
    let mid = Math.floor((start + end) / 2);

    // Compare mid with given key x 
    if (arr[mid] === x) return true;

    // If element at mid is greater than x, 
    // search in the left half of mid 
    if (arr[mid] > x)
        return recursiveFunction(arr, x, start, mid - 1);
    else

        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return recursiveFunction(arr, x, mid + 1, end);
}
function getDocTopTenSongs(doc) {
    var i = 0;
    let arr = [];
    var j = 0;
    for (i = 0; i < doc.length; i++) {
        if (i == 0) {
            arr[j] = {
                song_id: doc[i].song_id,
                song_name: doc[i].song_name,
                song_artwork: doc[i].image_file_path,
                song_rating: doc[i].song_rating,
                date_of_release: doc[i].date_of_release,
                artist: [{
                    artist_id: doc[i].artist_id,
                    artist_name: doc[i].artist_name
                }]
            };
        }
        else if (doc[i].song_id == doc[i - 1].song_id) {
            arr[j].artist.push({
                artist_id: doc[i].artist_id,
                artist_name: doc[i].artist_name
            })
        }
        else {
            j = j + 1;
            arr[j] = {
                song_id: doc[i].song_id,
                song_name: doc[i].song_name,
                song_artwork: doc[i].image_file_path,
                song_rating: doc[i].song_rating,
                date_of_release: doc[i].date_of_release,
                artist: [{
                    artist_id: doc[i].artist_id,
                    artist_name: doc[i].artist_name
                }]
            };
        }


    }

    return (arr);
}

async function getDocTopTenArtist(doc) {
    var i = 0;
    var temp = [];
    var res = [];
    let map = new Map();
    var j = 0;
    console.log(doc.length);

    for (i = 0; i < doc.length; i++) {


        if (i == 0) {
            if (doc[i].Bio == null) {
                res[j] =
                {
                    artist_id: doc[i].artist_id,
                    artist_name: doc[i].artist_name,
                    artist_dob: doc[i].date_of_birth,
                    songs: [{
                        song_id: doc[i].song_id,
                        song_name: doc[i].song_name
                    }]
                }
            }
            else {
                res[j] =
                {
                    artist_id: doc[i].artist_id,
                    artist_name: doc[i].artist_name,
                    artist_dob: doc[i].date_of_birth,
                    artist_bio: doc[i].Bio,
                    songs: [{
                        song_id: doc[i].song_id,
                        song_name: doc[i].song_name
                    }]
                }

            }

            if (map.set(doc[i].artist_id, j)) {
                temp.push(doc[i].artist_id);
            }

        }
        else {
            var search = await recursiveFunction(temp, doc[i].artist_id, 0, temp.length);

            if (search) {

                res[map.get(doc[i].artist_id)].songs.push({
                    song_id: doc[i].song_id,
                    song_name: doc[i].song_name
                })

            }
            else {
                j = j + 1
                if (doc[i].Bio == null) {
                    res[j] =
                    {
                        artist_id: doc[i].artist_id,
                        artist_name: doc[i].artist_name,
                        artist_dob: doc[i].date_of_birth,
                        songs: [{
                            song_id: doc[i].song_id,
                            song_name: doc[i].song_name
                        }]
                    }
                }
                else {
                    res[j] =
                    {
                        artist_id: doc[i].artist_id,
                        artist_name: doc[i].artist_name,
                        artist_dob: doc[i].date_of_birth,
                        artist_bio: doc[i].Bio,
                        songs: [{
                            song_id: doc[i].song_id,
                            song_name: doc[i].song_name
                        }]
                    }
                }

                if (map.set(doc[i].artist_id, j)) {
                    temp.push(doc[i].artist_id);
                }

            }
        }
    }


    return res;
}

async function getSearchSongs(doc) {
    var i = 0;
    let arr = [];
    var j = 0;
    for (i = 0; i < doc.length; i++) {
        if (i == 0) {
            arr[j] = {
                song_id: doc[i].id,
                song_name: doc[i].name,
                song_artwork: doc[i].image_file_path,
                song_rating: doc[i].rating,
                date_of_release: doc[i].date_of_release,
                artist: [{
                    artist_name: doc[i].artist_name
                }]
            };
        }
        else if (doc[i].song_id == doc[i - 1].song_id) {
            arr[j].artist.push({
                artist_name: doc[i].artist_name
            })
        }
        else {
            j = j + 1;
            arr[j] = {
                song_id: doc[i].id,
                song_name: doc[i].name,
                song_artwork: doc[i].image_file_path,
                song_rating: doc[i].rating,
                date_of_release: doc[i].date_of_release,
                artist: [{
                    artist_name: doc[i].artist_name
                }]
            };
        }


    }

    return (arr);
}


router.get('/', (req, res, next) => {


    Song.getTopTenSongs(true, async (err, doc) => {
        if (err) {
            res.status(200).json({ status: false, message: err });
        }
        else {
            var songs = await getDocTopTenSongs(doc);
            var artist = await getDocTopTenArtist(doc);

            if (songs.length > 10) {
                songs = songs.slice(0, 10);
            }
            if (artist.length > 10) {
                artist = artist.slice(0, 10);
            }
            res.status(200).json({ status: true, songs: songs, artist: artist });


        }

    });


})
    .get('/getArtistOrderByName', (req, res, next) => {
        Artist.getArtistOrderByName(true, async (err, doc) => {
            if (err) {
                res.status(200).json({ status: false, message: err });
            }
            else {
                var artist = await getDocTopTenArtist(doc);
                res.status(200).json({ status: true, doc: artist })
            }
        })
    });


router.post('/', (req, res, next) => {


    Song.searchSong(req.body.query, async (err, doc) => {
        if (err) {
            res.status(200).json({ status: false, message: err });
        }
        else {
            var songs = await getSearchSongs(doc);
            res.status(200).json({ status: true, songs: songs });


        }

    });


});
module.exports = router;