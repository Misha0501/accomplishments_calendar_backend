import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dayRoutes from './routes/dayRoutes';
import {connectDB} from './services/database.service';
import authRoutes from "./routes/authRoutes";
import calendarRoutes from "./routes/calendarRoutes";

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/api/days', dayRoutes);

app.use('/api/calendars', calendarRoutes);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
