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

function sing_in(name, password) {
    console.log("會員登錄");
}

function sing_up(name, email, password) {
    console.log("會員註冊");
}

function getUserNumByName(username, callback) {
    var cmd = "select * from userinfo where username = ? ";
    connection.query(cmd, [username], function (err, result) {
        if (err) {
            return;
        }
        connection.release();
        callback(err, result);
    });
}


module.exports = {
    connection: connection,
    download: download,
    upload: upload,
    sing_in: sing_in,
    sing_up: sing_up
}