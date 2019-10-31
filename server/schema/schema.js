const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

let items = [
    { name: 'Name of the Wind', type: 'Fantasy', price: '', photo: '', id: '1' },
    { name: 'The Final Empire', type: 'Fantasy', price: '', photo: '', id: '2' },
    { name: 'The Long Earth', type: 'Sci-Fi', price: '', photo: '', id: '3' },
];

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        price: {type: GraphQLString},
        photo: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        item: {
            type: ItemType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(items, { id: args.id });
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args){
                return items;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});