var express = require('express');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 4500;

// connecting to mongolabs db instance 'fullstack-testapp' with user 'test', pw 'test'
mongoose.connect('mongodb://test:test@ds047095.mongolab.com:47095/fullstack-testapp');

app.use(function(req, res, next) {
    // allowing CORS for ember local serve port (http://localhost:4200)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// define schema
var noteSchema = new mongoose.Schema({
  title: 'string',
  content: 'string',
  author: 'string'
});

// when we insert documents into the MongoDB based on this model the collection
// it creates the pluralized version of the model name.
// So inside our emberData database there will be a notes collection
var NoteModel = mongoose.model('note', noteSchema);

// // create some test data documents and place them in the notes collection in MongoDB
// var testNoteOne = NoteModel({
//   title: 'Test Note 1',
//   content: 'Lorem ipsum dolor sit amet',
//   author: 'Jim Jest'
// });
//
// var testNoteTwo = NoteModel({
//   title: 'Test Note 2',
//   content: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   author: 'Jim Jest'
// });
//
// var testNoteThree = NoteModel({
//   title: 'Test Note 3',
//   content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   author: 'Jim Jest'
// });
//
// // Save to MongoDB
// testNoteOne.save(function(err) {
//   if (err) throw err;
//   console.log('Note 1 saved');
// });
//
// testNoteTwo.save(function(err) {
//   if (err) throw err;
//   console.log('Note 2 saved');
// });
//
// testNoteThree.save(function(err) {
//   if (err) throw err;
//   console.log('Note 3 saved');
// });

// just placeholder content for root route
app.use('/', function(req, res, next) {
  console.log('Request URL: ' + req.url);
  // next method says to move on to the next middleware
  next();
});

// set up api request/response
app.get('/api/',function(req,res) {
	res.send('Working');
});

// route for getting all notes
app.get('/api/notes', function(req,res) {
	NoteModel.find({},function(err,docs) {
		if(err) {
      // using object syntax as this is how ember data expects it to be formatted
			res.send({error: err});
      // res.send(err);
		}
		else {
      // 'note' is the name of the model to be created in ember and 'docs' is an array of returned documents
			res.send({note: docs});
      // res.send(docs);
		}
	});
});

app.listen(port);
