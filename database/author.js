const mongoose = require("mongoose");

//AUTHOR SCHEMA
const AuthorSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String]  // isbn of the bookb
});

//Creating Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;

/*
POSTMAN Format

{
	"newAuthor": {
		"id":1,
		"name": "Shiva",
		"books": [
			"I'm the World",
			"Get What you want"
			]
	}
}

*/