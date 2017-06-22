var mysql = require('mysql');
var credentials = require("./credentials.js")

var connection = mysql.createConnection({
    host: credentials.SQL.host,
    user: credentials.SQL.user,
    password: credentials.SQL.password,
    database: credentials.SQL.database
});

function download() {
    console.log("資料庫下載");
}

function upload() {
    console.log("資料庫上傳");
}

function sing_in(user, password, callback) {
    getUser(user, (result) => {
        if (result == "") {
            callback(false, "查無此帳號");
        } else {
            if (result[0].password == password) {
                callback(true, "登錄成功");
            } else {
                callback(false, "密碼無效");
            }
        }
    });
}

function sing_up(user, email, password, callback) {
    getUser(user, (result) => {
        if (result == "") {
            addUser(user, email, password, (result) => {
                callback(true, "註冊成功");
            })
        } else {
            callback(false, "此帳號已有人註冊過");
        }
    });
}

function getUser(user, callback) {
    var cmd = "select * from account where user = ?";
    connection.query(cmd, [user], (err, result) => {
        if (!err) {
            callback(result);
        } else {
            console.log(err);
        }
    });
}

function addUser(user, email, password, callback) {
    var cmd = "INSERT INTO account (user, email, password) VALUES ?";
    var value = [
        [user, email, password]
    ];
    connection.query(cmd, [value], (err, result) => {
        if (!err) {
            callback(result);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    connection: connection,
    download: download,
    upload: upload,
    sing_in: sing_in,
    sing_up: sing_up
}