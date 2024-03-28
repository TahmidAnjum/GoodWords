import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Post } from "./post";
import { Like } from "./like";
import { Comment } from "./comment";

const createApolloGraphQLServer = async () => {
  const gqlServer = new ApolloServer({
    typeDefs: `
            type Query {
                ${User.queries},
                ${Post.queries},
                ${Like.queries},
                ${Comment.queries}
            }
            type Mutation {
                ${User.mutations},
                ${Post.mutations},
                ${Like.mutations},
                ${Comment.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
        ...Like.resolvers.queries,
        ...Comment.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
        ...Like.resolvers.mutations,
        ...Comment.resolvers.mutations,
      },
    },
  });
  await gqlServer.start();
  return gqlServer;
};

export default createApolloGraphQLServer;
