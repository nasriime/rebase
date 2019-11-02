const { gql } = require('apollo-server');
const AWS = require('aws-sdk');
const fs = require('fs');
const Item = require('./models/item');


AWS.config = new AWS.Config();
AWS.config.update({
        accessKeyId : 'AKIARJU5WAN6N3KJ4NHK',
        secretAccessKey : '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',
        region: "eu-west-2",
      });

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const typeDefs = gql`  
  type Item {
    id: ID!,
    name: String!,
    type: String!,
    price: String!,
    photo: String!,
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  type Query {
    _ : Boolean
  }
  
  type Mutation {
    singleUpload(file: Upload!): File!,
    singleUploadStream(file: Upload!): File!
  }
`;

const resolvers = {
  Mutation: {
    singleUpload: (parent, args) => {
      return args.file.then(file => {
        const {createReadStream, filename, mimetype} = file

        const fileStream = createReadStream()

        fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))

        return file;
      });
    },
    singleUploadStream: async (parent, args) => {
      const file = await args.file
      const {createReadStream, filename, mimetype} = file
      const fileStream = createReadStream()

      const uploadParams = {Bucket: 'cafe-react-test', Key: filename, Body: fileStream};
      const result = await s3.upload(uploadParams).promise()

      console.log(result)


      return file;
    }
  },
};


module.exports = {
    typeDefs,
    resolvers
}