var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('bookday', ['bookday']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/bookday', function (req, res) {
  console.log('All right');

  db.bookday.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/bookday', function (req, res) {
  console.log(req.body);
  db.bookday.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/bookday/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bookday.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/bookday/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bookday.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/bookday/:id', function (req, res) {
  var id = req.params.id;
  db.bookday.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {recept: req.body.recept}},//change avtomatic change
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");