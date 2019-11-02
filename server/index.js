const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const schema = require('./graph');

mongoose.connect('mongodb://nasr:nasr123@ds141178.mlab.com:41178/rebase-menu',{ useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

const server = new ApolloServer(schema);

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
