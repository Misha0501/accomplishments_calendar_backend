import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes';
import iteratorRoutes from './routes/iteratorRoutes';
import connectDB from './db/mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// configure the Express app to parse JSON-formatted request bodies
app.use(express.json());

// define the user routes
app.use(userRoutes);

// define the iterator routes
app.use(iteratorRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server Misha");
});

// Connect to MongoDB then start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});