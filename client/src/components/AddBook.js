import React, { Component } from 'react';

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { GET_AUTHORS, ADD_BOOK,GET_BOOKS } from '../queries/queries'
//example of query components in graph ql
//http://engineering.khanacademy.org/posts/creating-query-components-with-apollo.htm



class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }
    displayAuthors() {
        var data = this.props.getAuthorsQuery
        if (data.loading) {
            return (<option disabled>Loading authors...</option>)
        } else {
            return data.authors.map((author, index) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    submitForm(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.addBookMutation({
            variables: { name: this.state.name,
                         genre: this.state.genre, 
                         authorId: this.state.authorId
                       },
                       refetchQueries:[{query:GET_BOOKS}]
        })
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>BookName:</label>
                    <input type='text' onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type='text' onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Author</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}


export default compose(graphql(GET_AUTHORS, { name: "getAuthorsQuery" }), graphql(ADD_BOOK, { name: "addBookMutation" }))(AddBook);
