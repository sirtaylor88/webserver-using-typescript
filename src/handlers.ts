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

type requesteData = {
    body: string;
};

const dataIsValid = (data: object): data is requesteData =>
   'body' in data && typeof data.body === 'string';


function jsonResponse(res: Response, payload: object, code: number = 200) {
    res.header('Content-Type', 'application/json');
    const body = JSON.stringify(payload);
    res.status(code).send(body);
    res.end();
}

function respondWithError(res: Response, message: string = 'Something went wrong', code: number = 400): void  {
    const payload = {
        error: message
    }
    jsonResponse(res, payload, code);
}

export async function handlerValidate(req: Request, res: Response): Promise<void>  {
    let body = ''; // 1. Initialize

    // 2. Listen for data events
    req.on('data', (chunk) => {
        body += chunk;
    });

    // 3. Listen for end events
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            if (!dataIsValid(parsedBody)) {
                respondWithError(res);
                return;
            }

            if (parsedBody.body.length > 140) {
                respondWithError(res, 'Chirp is too long');
                return;
            }

            const payload = {
                valid: true
            };
            jsonResponse(res, payload);

        } catch (error) {
            respondWithError(res, `Invalid JSON: ${error}`);
        }
    });
}
