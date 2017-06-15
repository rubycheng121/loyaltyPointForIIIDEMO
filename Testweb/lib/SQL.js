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

function upload () {
    console.log("資料庫上傳");
}

module.exports = {
    connection: connection,
    download: download,
    upload: upload
}