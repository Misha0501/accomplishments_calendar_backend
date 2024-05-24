import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {connectDB} from './services/database.service';
import calendarRoutes from "./routes/calendarRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.use('/api/calendars', calendarRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
