import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());

const startServer = async() => {
    const gqlServer = new ApolloServer({
        typeDefs : `
            type Query {
                hello : String
            }
        `,
        resolvers : {
            Query : {
                hello : () => `Hey there!`
            }
        }
    });
    await gqlServer.start();
    app.get("/", (req, res) =>{
        res.json({msg : "Server is up and running"});
    })
    app.use('/graphql', expressMiddleware(gqlServer));
    
    app.listen(PORT, () => {console.log(`Server started at port ${PORT}`)});
}

startServer();

