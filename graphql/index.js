const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const root = require('./resolvers');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
});
