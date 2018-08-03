const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./src/graphql/schema/schema');
const app = express();
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data.json');
const middlewares = jsonServer.defaults()

const transactionController = require('./src/controller/transaction');

server.use(middlewares);
//Balance is calculated based on transactions.
//How do if there is many transactions
server.get('/balance', (req, res) => {
  res.jsonp(transactionController.getBalance())
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if(req.url === '/transactions' && req.method === 'POST') {
        req.body = transactionController.mountTransaction(req.body);
    }
    next()
})

server.use('/graphql', expressGraphQL({
    schema, 
    graphiql: true
}));

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running on port 3000')
})

// app.use('/graphql', expressGraphQL({
//     schema, 
//     graphiql: true
// }));

// app.listen(4000, () => {
//     console.log('Listening on port 4000');
// })