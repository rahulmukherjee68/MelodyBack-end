'user strict';
var sql = require('./db.js');

//artist object constructor
var Artist =function(artist){
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


module.exports = Artist;
