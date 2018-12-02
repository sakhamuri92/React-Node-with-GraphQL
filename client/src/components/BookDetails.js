import React, { Component } from 'react';

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { GET_BOOK_QUERY } from '../queries/queries'





class BookDetails extends Component {
    constructor(props) {
        super(props);
    }
    displayBookDetails() {
        const { book } = this.props.data
        if (book) {
            return (<div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books under author...</p>
                <ul className="other-books">
                    {book.author.books.map(item => {
                        return (<li key={item.id}>{item.name}</li>)
                    })
                    }
                </ul>
            </div>)
        } else {
            return (<div>No book selected</div>)
        }
    }
    render() {
        return (<div id="book-details">
            <p>Output book details:</p>
            {this.displayBookDetails()}
        </div>
        );
    }
}


export default graphql(GET_BOOK_QUERY, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
