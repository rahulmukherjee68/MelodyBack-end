'user strict';
var sql = require('./db.js');

//songs object constructor
var Song = function (song) {
    this.name = song.name;
    this.date_of_release = song.date_of_release;
    this.image_file_path = song.image_file_path;

}

Song.createSong = function (newSong, result) {
    sql.query("INSERT INTO songs set ?", newSong, (err, res) => {

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

Song.getSongById = function (songId, result) {
    sql.query("select * from songs where id=?", songId, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res);
            result(null, res);
        }
    });
};

Song.updateSongById = function (songList, result) {

    var update = [songList.total_rating, songList.total_users_rated, songList.rating, songList.id];

    sql.query("UPDATE songs SET total_rating=?,total_users_rated=?,rating=? WHERE id=?", update,
        (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.affectedRows);
                result(null, res);
            }
        });
};

Song.getTopTenSongs = function (songList, result) {
    if (songList) {
        sql.query(`SELECT DISTINCT songs.id as song_id,songs.name as song_name, songs.date_of_release,
        songs.rating as song_rating,songs.image_file_path,artists.name as artist_name, 
        artists.id as artist_id ,artists.date_of_birth FROM artist_song_map RIGHT JOIN songs ON artist_song_map.song_id=songs.id 
        RIGHT JOIN artists ON artist_song_map.artist_id = artists.id ORDER by songs.rating DESC`,
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
        result(null, "Request Not Provided Correctly");
    }
};

Song.searchSong = function (query, result) {
    if (query) {
        sql.query(`SELECT DISTINCT songs.id as song_id,songs.name as song_name, songs.date_of_release,
        songs.rating as song_rating,songs.image_file_path,artists.name as artist_name, 
        artists.id as artist_id ,artists.date_of_birth FROM artist_song_map RIGHT JOIN songs ON artist_song_map.song_id=songs.id and songs.name LIKE '`+ query + `%` + `'
        RIGHT JOIN artists ON artist_song_map.artist_id = artists.id ORDER by songs.rating DESC`,
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
}

module.exports = Song;



//SELECT songs.id ,songs.name, artist_song_map.id AS artist_map_id, artist_song_map.artist_id as artist_id FROM songs RIGHT JOIN artist_song_map ON songs.id = artist_song_map.song_id ORDER BY songs.rating DESC



//SELECT artist_song_map.id, songs.id,songs.name,songs.rating,artists.name, artists.id FROM artist_song_map RIGHT JOIN songs ON artist_song_map.song_id=songs.id RIGHT JOIN artists ON artist_song_map.id = artists.id ORDER by songs.rating DESC


//SELECT songs.id as song_id,artists.name as artist_name, artists.id as artist_id FROM artists LEFT JOIN artist_song_map ON artists.id=artist_song_map.artist_id LEFT JOIN songs ON songs.id=artist_song_map.song_id ORDER by songs.rating DESC
