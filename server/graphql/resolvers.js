const Lead = require("../models/Lead");

const resolvers = {
  Query: {
    leads: async () => {
      const res = await Lead.find();

      return res;
    },
  },
};

module.exports = resolvers;
