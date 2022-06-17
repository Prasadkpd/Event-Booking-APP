const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");
const mongoose = require("mongoose");

const app = express();
const events = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        type RootQuery {
            events: [Event!]!
        }
        
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const {eventInput} = args;
            const {date, description, price, title} = eventInput;
            const event = {
                _id: Math.random().toString(),
                title: title,
                description: description,
                price: +price,
                date: date
            }
            events.push(event);
            return event;
        }
    },
    graphiql: true
}));

mongoose.connect('mongodb://localhost:27017/Event_Manage')
    .then(() => {
        app.listen(4000);
    })
    .catch(err => {
        console.log(err);
    })

