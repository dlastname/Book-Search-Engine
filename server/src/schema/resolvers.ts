// import { Context } from "vm";
import { User } from "../models/index.js"
import { signToken, AuthenticationError } from "../services/auth.js";
import { GraphQLError } from "graphql";

// xTODO: build the interfaces
interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

interface SaveBookArgs {
  bookId: string;
  authors: [string];
  description: string;
  title: string;
  image: string;
  link: string;
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface BookArgs {
  bookId: string;
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
    // This is the query to return who you are currently logged in as
    me: async (_parent: any, _args: {}, context: Context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          "savedBooks"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // Mutation to add a user
    addUser: async (_parent: any, args: AddUserArgs) => {
      console.log(args);
      
      const user = await User.create(args);

      if (!user) {
        throw new GraphQLError("Failed to create a new user", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
      const token = signToken(user.username, user.email, user._id);
      return { user, token };
    },

    saveBook: async (_parent: any, args: SaveBookArgs, context: Context) => {
      if (context.user) {
        // Create a new book object
        
        // const newBook = {
        //   bookId: args.bookId,
        //   authors: args.authors,
        //   description: args.description,
        //   title: args.title,
        //   image: args.image,
        //   link: args.link,
        // };

        // Update the user's savedBooks array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        ).populate("savedBooks");

        if (!updatedUser) {
          throw new GraphQLError("Failed to save book", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          });
        }

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in to save a book!");
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },

    removeBook: async (
      _parent: any,
      { bookId }: BookArgs,
      context: Context
    ) => {
      if (context.user) {
        const bookRemoval = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!bookRemoval) {
          throw new GraphQLError("Failed to remove book", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          });
        }

        return bookRemoval;
      }

      throw new AuthenticationError(
        "You need to be logged in to remove a book!"
      );
    },
  },
};

export default resolvers;
