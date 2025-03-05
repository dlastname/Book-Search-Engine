import { Context } from "vm";
import { Book, User } from "../models/index.js";
import { signToken, AuthenticationError } from "../services/auth";

// TODO: build the interfaces

interface UserArgs {
  username: string;
}

interface Context {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

const resolvers = {
  Query: {
    // TODO: build the queries

    // This is the query to return who you are currently logged in as
    me: async (_parent: any, _args: {}, context: Context): Promise<User> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },
  Mutation: {
    // TODO: build the mutations
  },
};

export default resolvers;
