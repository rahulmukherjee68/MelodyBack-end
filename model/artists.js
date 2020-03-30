'user strict';
var sql = require('./db.js');

//artist object constructor
var Artist = function (artist) {
    this.name = artist.name;
    this.date_of_birth = artist.date_of_birth;
    this.Bio = artist.Bio;

}

Artist.createArtist = (newArtist, result) => {
    sql.query("INSERT INTO artists set ?", newArtist, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Artist.getArtistOrderByName = (newArtist, result) => {
    if (newArtist) {
        sql.query(`SELECT artists.name as artist_name,artists.Bio, artists.id as artist_id , artists.date_of_birth, songs.id as song_id,
        songs.name as song_name
        FROM artists ,artist_song_map ,songs WHERE artist_song_map.artist_id=artists.id 
        and artist_song_map.song_id=songs.id ORDER by artists.name`,
            (err, res) => {

                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log(res);
                    result(null, res);
                }
            });
    }
    else {
        result("provided incorrect parameters")
    }
};
Artist.getAllArtist = (newArtist, result) => {
    if (newArtist) {
        sql.query(`Select id as id ,name as itemName ,date_of_birth,Bio  from artists`,
            (err, res) => {

                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log(res);
                    result(null, res);
                }
            });
    }
    else {
        result("provided incorrect parameters")
    }
};


module.exports = Artist;
