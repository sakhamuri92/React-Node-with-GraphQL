const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull } = graphql;

// var books = [
//     {name:"venky",genre:'adventure',id:'1',authorId:"1"},
//     {name:"gokul",genre:'fantasy',id:'2',authorId:"2"},
//     {name:"anish",genre:'adventure',id:'3',authorId:"1"},
//     {name:"test",genre:'fantasy',id:'4',authorId:"2"},
//     {name:"teste",genre:'adventure',id:'5',authorId:"1"},
//     {name:"sw",genre:'fantasy',id:'6',authorId:"2"}
    
// ]

// var authors = [
//     {name:"patick",age:33,id:'1'},
//     {name:"swaroop",age:22,id:'2'}
// ]

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:()=>({
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
           return  author.save(); 
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save();
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                //return _.find(authors,{id:parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:() =>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:() =>({
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               // return _.find(books,{id:args.id})
               return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id})
                return Author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return books
                return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors
                return Author.find({});
            }
        }
    })
})

module.exports = new GraphQLSchema({
query:RootQuery,
mutation:Mutation
});

//author and books

// {
//     author(id:2){
//         name,
//         books{
//           name
//         }
  
//     }
//   }

//single book and author
// {
//     book(id:2){
//       name,
//       author{
//         name
//       }
//     }
//   }

//list of authors

// {
//     authors{
//       name,
//       books{
//         name
//       }
//     }
//   }

//list of books and authors

// {
//     books{
//       name,
//       author{
//         name
//       }
//     }
//   }


//add book

// mutation{
//     addBook(name:"java",genre:"cse",authorId:"5b4a0ed0d5032f1f6c763ed7"){
//       name,genre
     
//     }
//   }

//add author

// mutation{
//     addAuhtor(name:"java",age:30){
//       name,age
     
//     }
//   }


//nested book and author and author with all his books


// {
//     book(id:"5b4a11497db81e0844ac0af1"){
//      name,
//      author{
//        name,
//          books{
//            name
//          }
//        }
     
//    }
//    }