'user strict';
var sql = require('./db.js');

//artist object constructor
var Map =function(map){
    this.song_id = map.song_id;
    this.artist_id = map.artist_id;
}

Map.createMap = (newMap, result) => {
    sql.query("INSERT INTO artist_song_map set ?", newMap, (err, res) => {

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
module.exports = Map;
