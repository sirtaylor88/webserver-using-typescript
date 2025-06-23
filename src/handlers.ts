import type { Request, Response } from 'express';
import { config } from './config.js';

export async function handlerReadiness(_: Request, res: Response): Promise<void> {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send('OK');
    res.end();
}

export async function handlerMetrics(_: Request, res: Response): Promise<void> {
    res.send(`Hits: ${config.fileserverHits}`);
    res.end();
}

export async function handlerReset(_: Request, res: Response): Promise<void> {
    config.fileserverHits = 0;
    res.write('Hits reset to 0');
    res.end();
}
