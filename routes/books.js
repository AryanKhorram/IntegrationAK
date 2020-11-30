let express = require('express');
let router = express.Router();
let booksSchema = require('../models/books');

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.post('/', (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let newBook = request.body;
    if (!newBook.Name || !newBook.Price || !newBook.Author){
        HandleError(response, 'Missing Info', 'Form data missing', 500);
    }else{
        let book = new booksSchema({
            Name : newBook.Name,
            Author: newBook.Author,
            ISBN: newBook.ISBN,
            Price: newBook.Price
        });
        book.save((error) => {
            if(error) {
                response.send({"error": error});
            }else{
                response.send({"id": book.id});
            }
        });
    }
});

router.get('/author/:author', (request, response, next) =>{
    console.log("Hello");
    router.get('/author/:author', (request, response, next) =>{
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")});
    booksSchema
        .findOne({"Author": request.params['author']}, (error, result)=> {
            if (error) {
                response.status(500).send(error);
            }
            if (result) {
                response.send(result);
            } else {
                response.status(404).send({"id": request.params.id, "error": "Not Found"});
            }
        })});

router.get('/', (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let Name = request.query['author'];
    if (Name) {
        booksSchema
            .find({"Author": Name})
            .exec((error, books) => {
                if (error) {
                    response.send({"error": error});
                } else {
                    response.send(books);
                }
            });
    } else {
        booksSchema
            .find()
            .exec((error, books) => {
                if (error) {
                    response.send({"error": error});
                } else {
                    response.send(books);
                }
            });
    }
});

router.get('/:id', (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    booksSchema
        .findOne({"ISBN": request.params['id']}), (error, result) =>{
            if (error){
                response.status(500).send(error);
            }
            if (result){
                response.send(result);
            }else{
                response.status(404).send({"id": request.params.id, "error": "Not Found"});
            }
        };
});

router.patch('/:id', (request, response, next) =>{
    router.get('/:isbn', (request, response, next) =>{
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")});
   booksSchema
       .findById(request.params.id, (error, result) => {
           if(error){
               response.status(500).send(error);
           }else if (result){
               if(request.body._id){
                   delete request.body._id;
               }
               for(let field in request.body){
                   result[field] = request.body[field];
               }
               result.save((error, books) => {
                   if (error){
                       response.status(500).send(error);
                   }
                   response.send(books);
               });
           }else{
               response.status(404).send({"id":request.params.id, "error": "Not Found"});
           }
       });
});

router.delete('/:id', (request, response, next) =>{
    router.get('/:isbn', (request, response, next) =>{
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")});
    booksSchema
        .findById(request.params.id, (error, result)=>{
            if(error) {
                response.status(500).send(error);
            }else if (result){
                result.remove((error)=> {
                    if (error) {
                        response.status(500).send(error);
                    }
                    response.send({"deleteId": request.params.id});
                });
            }else{
                response.status(404).send({"id":request.params.id, "error": "Not Found"});
            }
        });
});

module.exports = router;