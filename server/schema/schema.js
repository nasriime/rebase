const graphql = require('graphql');
const _ = require('lodash');
const Item = require('../models/item');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

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
                return Item.findById(args.id);
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args){
                return Item.find({});
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addItem: {
            type: ItemType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                type:  { type: new GraphQLNonNull(GraphQLString) },
                price:  { type: new GraphQLNonNull(GraphQLString) },
                photo:  { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let item = new Item({
                    name: args.name,
                    type: args.type,
                    price: args.price,
                    photo: args.photo
                });
                return item.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});