const graphql = require('graphql');
const _ = require('lodash');
const AWS = require('aws-sdk');
const { GraphQLUpload } = 'graphql-upload';
const fs = require('fs')
const Item = require('../models/item');

AWS.config.loadFromPath('../credentials.json');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

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

const FileType = new GraphQLObjectType({
    name: 'File',
    fields:() =>({
        filename:  { type: GraphQLString },
        mimetype:  { type: GraphQLString },
        encoding:  { type: GraphQLString },
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
        },
        singleUpload:{
            type: FileType,
            args:{
                file :{ type: GraphQLUpload}
            },
            resolve(parent, args){
                return args.file.then(file => {
                    const {createReadStream, filename, mimetype} = file
            
                    const fileStream = createReadStream()
            
                    fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))
            
                    return file;
                });
            }
        },
        singleUploadStream:{
            type: FileType,
            args:{
                file :{ type: GraphQLUpload}
            },
            async resolve(parent, args){
                const file = await args.file
                const {createReadStream, filename, mimetype} = file
                const fileStream = createReadStream()
            
                const uploadParams = {Bucket: 'cafe-react-test', Key: filename, Body: fileStream};
                const result = await s3.upload(uploadParams).promise()
            
                console.log(result)
            
                return file;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});