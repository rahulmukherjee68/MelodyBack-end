'user strict';
var sql = require('./db.js');

//artist object constructor
var User =function(User){
    this.name = User.name;
    this.email = User.email;
}

User.createUser = (newUser, result) => {
    sql.query("INSERT INTO users set ?", newUser, (err, res) => {

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

User.findUser = (email, result) => {
    sql.query("select id from users where email=?", email, (err, res) => {

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
module.exports = User;
