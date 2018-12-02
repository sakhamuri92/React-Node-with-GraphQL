import gql from "graphql-tag";

const GET_BOOKS = gql`
  query getBooksQuery {
    books {
      id
      name
    }
  }
`

const GET_AUTHORS = gql`
  query getAuthorsQuery {
    authors {
      id
      name
    }
  }
`

// const ADD_BOOK = gql` query addBook($name:String!,$authorId:String!,$genre:String!) {
//         mutation {
//         addBook(name:"",authorId:"",genre:""){
//             name,
//             id
//         }
//     }
// }
//


// const getBooksQuery = gql`
//     {
//     books {
//       id
//       name
//     }
//   }
// `

const ADD_BOOK = gql`
    mutation AddBook($name:String!,$authorId:ID!,$genre:String!) {
    addBook(name:$name,authorId:$authorId,genre:$genre){
        name,
        id
    }
}
`
const GET_BOOK_QUERY = gql`
query($id:ID){
    book(id:$id){
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`

export {GET_BOOKS,GET_AUTHORS,ADD_BOOK,GET_BOOK_QUERY}