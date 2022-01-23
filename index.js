require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Database
//const database = require("./database");

//Models 
const BookModel = require("./database/book.js");
const AuthorModel = require("./database/author.js");
const PublicationModel = require("./database/publications.js");

//Initialize express
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

// establishing bd connection
mongoose.connect(
  process.env.MONGO_URL
).then(() => console.log("Connection Established!!"));

/************************************************* GET REQUESTS ************************************************/

          /*********************************** BOOKS ***********************************/

//GET ALL BOOKS
/*
Route           /book
Description     Get all books
Access          Public
Parameter       NONE
Methods         GET
*/

/*
booky.get("/book", (req,res) => {
  return res.json({books: database.books});       
});
*/

booky.get("/book", async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

//GET A SPECIFIC BOOK localhost:3000/12345Book
/*
Route           /book
Description     Get specific book
Access          Public
Parameter       isbn 
Methods         GET
*/

/*
booky.get("/book/:isbn", (req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if(getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for ISBN of ${req.params.isbn}`
    });
  }
  return res.json({book: getSpecificBook});
});
*/

booky.get("/book/:isbn",async (req,res) => {
  const getSpecificBookOnIsbn = await BookModel.findOne({ISBN: req.params.isbn});

   if(!getSpecificBookOnIsbn) {
     return res.json({
       error: `No book found for ISBN of ${req.params.isbn}`
     });
   }

   return res.json({book: getSpecificBookOnIsbn});

 });


//GET BOOKS on a specific category
/*
Route           /book/c
Description     Get specific book
Access          Public
Parameter       category
Methods         GET
*/

/*booky.get("/book/c/:category", (req,res)=> {
  const getSpecificBookOnCategory = database.books.filter((book) =>
book.category.includes(req.params.category)
);
if(getSpecificBookOnCategory.length === 0) {
  return res.json({
    error: `No book found for category of ${req.params.category}`   
  });
}
return res.json({book: getSpecificBookOnCategory});
});
*/

booky.get("/book/c/:category", async (req,res)=> {

const getSpecificBookOnCategory = await BookModel.find({category: req.params.category});  

//If no specific book is returned the , the findne func returns null, and to execute the not
//found property we have to make the condn inside if true, !null is true.

if(!getSpecificBookOnCategory) {
  return res.json({
    error: `No book found for category of ${req.params.category}`
  });
}

return res.json({book: getSpecificBookOnCategory});

});

//GET A SPECIFIC BOOK localhost:3000/12345Book
/*
Route           /book/l
Description     Get specific book
Access          Public
Parameter       language 
Methods         GET
*/

/*
booky.get("/book/l/:lan", (req,res) => {
  const getSpecificBookOnLang = database.books.filter(
    (book) => book.language === req.params.lan
  );
  if(getSpecificBookOnLang.length === 0) {
    return res.json({
      error: `No book found for ISBN of ${req.params.lan}`          
    });
  }
  return res.json({book: getSpecificBookOnLang});
});
*/

booky.get("/book/l/:lang", async (req,res)=> {

  const getSpecificBookOnLang = await BookModel.find({language: req.params.lang});

  if(!getSpecificBookOnLang) {
    return res.json({
      error: `No book found for category of ${req.params.lang}`
    });
  }

  return res.json({book: getSpecificBookOnLang});

  });

          /************************************* AUTHORS *******************************/

//GET ALL AUTHORS
/*
Route           /author
Description     Get all authors
Access          Public
Parameter       NONE
Methods         GET
*/

/*
booky.get("/author", (req, res)=> {
  return res.json({authors: database.author});
});
*/

booky.get("/author",async (req, res)=> {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

//GET SPECIFIC AUTHOR BASED ON ID
/*
Route           /author/:id
Description     Get all authors
Access          Public
Parameter       id
Methods         GET
*/

/*
booky.get("/author/:id", (req,res) => {
  const getSpecificAuthor = database.author.filter(
    (authors) => authors.id === req.params.id
  );
  if(getSpecificAuthor.length === 0) {
    return res.json({
      error: `No book found for ISBN of ${req.params.id}` 
    });
  }
  return res.json({author: getSpecificAuthor});
});
*/

booky.get("/author/:id", async (req,res) => {

  const getAuhtorOnId = await AuthorModel.findOne({id: req.params.id});
  if(!getAuhtorOnId){
    return res.json({
      error: `No Auhtor found for id of ${req.params.id}`
    });
  }
  return res.json({author: getAuhtorOnId});

});


//GET ALL AUTHORS BASED ON A BOOK
/*
Route           /author/book
Description     Get all authors based on book
Access          Public
Parameter       books
Methods         GET
*/

/*
booky.get("/author/book/:books", (req,res)=> {
  const getSpecificAuthor = database.author.filter((author) =>
author.books.includes(req.params.books)
);
if(getSpecificAuthor.length === 0) {
  return res.json({
    error: `No author found for books of ${req.params.books}`      
  });
}
return res.json({authors: getSpecificAuthor});
});
*/

booky.get("/author/book/:books",async (req,res)=> {
  
  const getSpecificAuthor = await AuthorModel.findOne({books: req.params.books});

if(!getSpecificAuthor) {
  return res.json({
    error: `No author found for book of ${req.params.books}`
  });
}

return res.json({authors: getSpecificAuthor});
});

          /******************************* PUBLICATIONS **************************/

//GET ALL PUBLICATIONS
/*
Route           /publication
Description     Get all publications
Access          Public
Parameter       NONE
Methods         GET
*/

/*
booky.get("/publications", (req,res) => {
  return res.json({publications: database.publication});
});
*/

booky.get("/publication", async (req,res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

//GET SPECIFIC PUBLICATION BASED ON ID
/*
Route           /publication/:id
Description     Get publication based on id
Access          Public
Parameter       id
Methods         GET
*/

/*
booky.get("/publication/:id", (req,res) => {
  const getSpecificPublication = database.publication.filter(
    (publications) => publications.id === req.params.id
  );
  if(getSpecificPublication.length === 0) {
    return res.json({
      error: `No book found for ISBN of ${req.params.id}`
    });
  }
  return res.json({publication: getSpecificPublication});
});
*/

booky.get("/publication/:id", async (req,res) => {

  const getPublicationrOnId = await PublicationModel.findOne({id: req.params.id});
  if(!getPublicationrOnId){
    return res.json({
      error: `No Auhtor found for id of ${req.params.id}`
    });
  }
  return res.json({publication: getPublicationrOnId});

});

//GET PUBLICATON BASED ON A BOOK
/*
Route           /publication/book
Description     Get all publications based on book
Access          Public
Parameter       books
Methods         GET
*/

/*
booky.get("/publication/book/:books", (req,res)=> {
  const getSpecificPublication = database.publication.filter((publication) =>
publication.books.includes(req.params.books)
);
if(getSpecificPublication.length === 0) {
  return res.json({
    error: `No publications found for books of ${req.params.books}`        
  });
}
return res.json({publication: getSpecificPublication});
});
*/

booky.get("/publication/book/:books",async (req,res)=> {
  const getSpecificPublication = await PublicationModel.findOne({books: req.params.books});

if(!getSpecificPublication) {
  return res.json({
    error: `No publications found for books of ${req.params.books}`
  });
}

return res.json({publication: getSpecificPublication});
});


/****************************************************** POST REQUESTS ******************************************/

            /*********************************** BOOKS **********************************/

//ADD NEW BOOKS
/*
Route           /book/new
Description     add new books
Access          Public
Parameter       NONE
Methods         POST
*/

/*
booky.post("/book/new", async (req,res)=> {
  const newBook = req.body;                                      
  database.books.push(newBook);
  return res.json({newBook: database.books});
});
*/

booky.post("/book/new", async (req,res)=> {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook)
  return res.json({books: addNewBook, message: "Book was added!"});
});

            /********************************** AUTHORS *******************************/

//ADD NEW AUTHORS
/*
Route           /author/new
Description     add new authors
Access          Public
Parameter       NONE
Methods         POST
*/

/*
booky.post("/author/new", (req,res)=> {
  const newAuthor = req.body;
  database.author.push(newAuthor);                             
  return res.json({updatedAuthors: database.author});
});
*/

booky.post("/author/new", async (req,res)=> {
  const { newAuthor } = await req.body;
  const addNewAuthor = AuthorModel.create(newAuthor)
  return res.json({authors: addNewAuthor, message: "Author was added"});
});

          /********************************** PUBLICATIONS **********************************/

//ADD NEW PUBLICATION
/*
Route           /publication/new
Description     add new publications
Access          Public
Parameter       NONE
Methods         POST
*/

/*
booky.post("/publication/new", (req,res)=> {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json({updatedPublications: database.publication}); 
*/

booky.post("/publication/new", async (req,res)=> {
  const { newPublication } = await req.body;
  const addNewPublication = PublicationModel.create(newPublication)
  return res.json({publications: addNewPublication, message: "Publication was added"});
});

/************************************************************** PUT REQUESTS *****************************************/

            /**************************************** BOOKS *******************************/

//Update a book title
/*
Route           /book/update/:isbn
Description     update title of the book based on isbn
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/:isbn", async (req,res)=> {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      title: req.body.bookTitle
    },
    {
      new: true
    }
  );

  return res.json({books: updatedBook, message: "Book was Updated"});
});

          /****************************** PUBLICATIONS ********************************************/

//UPADTE PUBLICATIONS AND BOOK
/*
Route           /publication/update/book
Description     update the pub and the book
Access          Public
Parameter       books
Methods         PUT
*/

/*
booky.put("/publication/update/book/:books", (req,res)=> {
  //UPDATE THE PUB DB
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId) {    // publication has published book
      return pub.books.push(req.params.books);
    }
  });
  //forEach() is the ES6 version format for forloop
  //UPDATE THE BOOK DB
  database.books.forEach((book) => {
    if(book.title == req.params.books) {
      book.publications = req.body.pubId;    // publication has been entered wrong so we updated it here
      return;
    }
  });
  return res.json(
    {
      books: database.books,
      publications: database.publication,
      message: "Successfully updated!"
    }
  );
});
*/

booky.put("/publication/update/book/:books", async (req,res) => {

  //UPDATE THE PUBLICATION DB
  const updatedPublications = await PublicationModel.findOneAndUpdate(
    {
      id: req.body.pubId
    },
    {
      $push: {
        books: req.params.books
      }
    },
    {
      new: true
    }
  );

  //UPDATE THE BOOK DB
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      title: req.params.books
    },
    {
      publications: req.body.pubId
    },
    {
      new: true
    }
  );

  return res.json(
    {
      books: updatedBook,
      publications: updatedPublications,
      message: "Successfully updated!"
    }
  );

});

/*********************************************************** DELETE REQUESTS ********************************************/

            /************************************* BOOKS ************************************/

//DELETE A BOOK
/*
Route           /book/delete
Description     delete a book
Access          Public
Parameter       isbn
Methods         DELETE
*/

/*
booky.delete("/book/delete/:isbn", (req,res)=> {
  const updateBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updateBookDatabase;
  return res.json({books: database.books});
});
*/

booky.delete("/book/delete/:isbn", async (req,res)=> {
  const updateBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn
  });

  return res.json({books: updateBookDatabase , message: "Deleted"});
});

           /********************************* AUTHOR ***********************************/

//DELETE AN AUTHOR FROM A BOOK AND VICE VERSA
/*
Route           /book/delete/author
Description     delete an author from a book and vice versa
Access          Public
Parameter       books, authorId
Methods         DELETE
*/

booky.delete("/book/delete/author/:books/:authorId", async (req,res)=> {
  //Update the book db
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      title: req.params.books
    },
    {
     $pull: {
       author: parseInt(req.params.authorId)
     }
   },
   {
     new: true
   }
 );
  //Update author db
  /*
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.books
      );
      eachAuthor.books = newBookList;
      return;
    }
  });
  */

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.params.authorId
    },
    {
     $pull: {
       books: req.params.books
     }
   },
   {
     new: true
   }
 );

  return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: "Author and book were deleted!!!"
  });

});


booky.listen(3000,() => console.log("Server is up and running!!!")); 
