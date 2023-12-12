import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors'; // Import the cors middleware

const app = express();
const PORT = 3001;

const __dirname = process.cwd();

app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all routes
app.use(cors());

app.get('/api/anecdotes', (_req: Request, res: Response) => {
    try {
        // Load anecdotes from data.json
        const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
        const anecdotes = JSON.parse(data);
        res.json(anecdotes);
    } catch (error: any) {
        console.error('Error reading data.json:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
