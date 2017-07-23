var mysql = require('mysql');
var credentials = require("./credentials.js")
var moment = require('moment');

var connection = mysql.createConnection({
    host: credentials.SQL.host,
    user: credentials.SQL.user,
    password: credentials.SQL.password,
    database: credentials.SQL.database
});

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
    let cmd = "INSERT INTO account (user, email, password) VALUES ?";
    let value = [
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

function new_project(user, project_name, contract, callback) {

    get_project(user, project_name, (result) => {
        if (result == "") {

            let cmd = "INSERT INTO project (user, project, contract, feature, stepDefinitions, solidity, mocha, create_date, last_update) VALUES ?";
            let date = moment().format('YYYY-MM-DD hh:mm:ss');
            let value = [
                [user, project_name, contract, "", "", "", "", date, date]
            ];
            connection.query(cmd, [value], (err, result) => {
                if (!err) {
                    callback(true, result);
                } else {
                    console.log(err);
                }
            });

        } else {
            callback(false, "你已經使用過此project name");
        }
    });
}

function get_project(user, project_name, callback) {
    var cmd = "select * from project where user = ? and project = ?";
    var value = [user, project_name];

    connection.query(cmd, value, (err, result) => {
        if (!err) {
            callback(result);
        } else {
            console.log(err);
        }
    });
}

function get_project_list(user, callback) {
    var cmd = "select * from project where user = ?";
    var value = [user];

    connection.query(cmd, value, (err, result) => {
        if (!err) {
            callback(result);
        } else {
            console.log(err);
        }
    });
}

function set_project(user, project, feature, stepDefinitions, solidity, mocha, callback) {
    var cmd = "update project set feature = ?, stepDefinitions = ?, solidity = ?, mocha = ?, last_update = ? where user = ? and project = ?";
    let date = moment().format('YYYY-MM-DD hh:mm:ss');
    var value = [feature, stepDefinitions, solidity, mocha, date, user, project];
    console.log(date);

    connection.query(cmd, value, (err, result) => {
        if (!err) {
            callback(result);
        } else {
            console.log(err);
        }
    });
}
function get_contract(user, project) {
    var cmd = "select contract from project where user = ? and project = ?";
    var value = [user, project];
     connection.query(cmd, value, (err, result) => {
        if (!err) {
            callback(result);
        } else {
            console.log(err);
        }
    });
}
module.exports = {
    connection: connection,
    sing_in: sing_in,
    sing_up: sing_up,
    new_project: new_project,
    get_project: get_project,
    get_project_list: get_project_list,
    set_project: set_project
}