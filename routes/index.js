var express = require('express');
var router = express.Router();
var path = require('path');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b782447e87b86a',
  password: '48f3e657',
  database: 'heroku_7f8f591ff4b2663'
});

connection.connect(function (err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

router.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

router.post('/login', function (req, res) {
  console.log(req.body);
  var query = "INSERT INTO User (username, password) VALUES ('" + req.body.username + "','" + req.body.password + "') ON DUPLICATE KEY UPDATE password= + '" + req.body.password + "';"
  connection.query(query, function (err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

router.get('/dashboardUsers', function(req, res) {
  var query = "SELECT year FROM caeu;";
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log('rows below');
      console.log(rows);
      console.log(query);
      res.json({
        result: 'success',
        rows
      });
    }
  });
});

router.get('/years', function(req, res) {
  var query = "SELECT DISTINCT year_id FROM caeu;";
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        result: 'success',
        rows
      })
    }
  })
})


router.post('/rowDataset', function(req, res) {
  var query = "SELECT m.num_meetings, m.num_issue_areas, m.admin_bureaucratic, m.location from caeu m WHERE m.year_id='" + req.body.currentLocation + "'ORDER BY m.year DESC;";
  connection.query(query, function(err, rows, fields) {
    console.log(rows)
    if (err) {
      console.log(err);
    } else {
      res.json({
        result: 'success',
        rows
      })
    }
  })
})


module.exports = router;
