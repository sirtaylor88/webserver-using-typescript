import type { Request, Response } from 'express';
import { config } from './config.js';

export async function handlerReadiness(_: Request, res: Response): Promise<void> {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send('OK');
    res.end();
}

export async function handlerMetrics(_: Request, res: Response): Promise<void> {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chirpy Admin</title>
        </head>
        <body>
            <h1>Welcome, Chirpy Admin</h1>
            <p>Chirpy has been visited ${config.fileserverHits} times!</p>
        </body>
        </html>
    `);
    res.end();
}

export async function handlerReset(_: Request, res: Response): Promise<void> {
    config.fileserverHits = 0;
    res.write('Hits reset to 0');
    res.end();
}
