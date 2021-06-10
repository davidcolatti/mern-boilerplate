const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Lead {
    _id: ID
    spid: Int
    businessName: String
    phoneNumber: String
    uploadDate: String
  }

  type Query {
    leads: [Lead]
  }
`;

module.exports = typeDefs;
