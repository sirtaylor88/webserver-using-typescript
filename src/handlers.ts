import type { Request, Response } from 'express';
import { config } from './config.js';
import { BadRequestError } from './errors.js';

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



function jsonResponse(res: Response, payload: object, code: number = 200) {
    res.header('Content-Type', 'application/json');
    const body = JSON.stringify(payload);
    res.status(code).send(body);
    res.end();
}

export function respondWithError(res: Response, message: string = 'Something went wrong', code: number = 500): void  {
    const payload = {
        error: message
    }
    jsonResponse(res, payload, code);
}

type requesteBody = {
    body: string;
};
const bodyMaxLength = 140;

export async function handlerValidate(req: Request, res: Response): Promise<void>  {
    const params: requesteBody = req.body;

    if (params.body.length > bodyMaxLength) {
        throw new BadRequestError(`Chirp is too long. Max length is ${bodyMaxLength}`);
    }

    const words = params.body.split(' ');
    for (const [idx, word] of words.entries()) {
        if (['kerfuffle', 'sharbert', 'fornax'].includes(word.toLowerCase())) {
            words[idx] = '****';
        }
    }
    const payload = {
        cleanedBody: words.join(' ')
    };
    jsonResponse(res, payload);

}
