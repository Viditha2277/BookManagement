const mongoose = require("mongoose");

// BOOK SCHEMA
const bookSchema = mongoose.Schema({
      ISBN: String,
      title: String,
      pubDate: String,
      language: String,
      numPage: Number,
      author: [Number],
      publications: Number,
      category: [String]
})

// Creat Book Model
const bookModel = mongoose.model("books",bookSchema);

module.exports = bookModel;

/*
POSTMAN Format

{
	"newBook": {
		"ISBN":"1234",
		"title": "I'm the World",
		"pubDate": "11-12-21",
		"language": "English",
		"numPage": 231,
		"auhtor": [2,1],
		"publications": 2,
		"category": [
			"Horror",
			"Triller"
			]
	}
}

*/