import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import mysql, { RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

interface User extends RowDataPacket {
    id: number;
    email: string;
}

const app = express();
const PORT = 3001;

const __dirname = process.cwd();

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all routes
app.use(cors());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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

app.get('/users', async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query<User[]>('SELECT * FROM users');

        const userListHtml = rows.map(user => {
            return `<li>${user.id}: ${user.email}</li>`;
        }).join('');

        const html = `<ul>${userListHtml}</ul>`;
        res.send(html);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
