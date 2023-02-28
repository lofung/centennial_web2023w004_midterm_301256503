// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add book',
    books:{
      Title: "",
      Price: "",
      Author: "",
      Genre: ""
    }
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    console.log(req.body)
    const Title = req.body.title
    const Price = req.body.price
    const Author = req.body.author
    const Genre = req.body.genre
    const new_entry = new book({Title, Price, Author, Genre})
    console.log(new_entry)
    try{
      const result = await new_entry.save()
      console.log(result)
      res.redirect(303, "/")
    } catch(e){
      console.error(e)
    }

    }
);

// GET the Book Details page in order to edit an existing Book
router.get('/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const _id = req.params.id
    const tempAllContacts = await book.find({_id})
    const allContacts = JSON.parse(JSON.stringify(tempAllContacts))
    res.render('books/details', {
      title: 'Edit book',
      books: allContacts
    });
    //res.json(allContacts)
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
