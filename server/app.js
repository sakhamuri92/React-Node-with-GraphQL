const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect('mongodb://venky:venky5@ds135441.mlab.com:35441/venky')
mongoose.connection.once('open',()=>{
    console.log("connected to database")
})

app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,() => {
    console.log('listening on port 4000')
}) 