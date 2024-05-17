import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import daysRouter from './routes/daysRouter';
import DatabaseService from './services/database.service';

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default

app.use(cors());
app.use(bodyParser.json());

app.use('/api/days', daysRouter);

DatabaseService.getInstance().connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
