import type { Request, Response, NextFunction } from 'express';
import { config } from './config.js';
import { respondWithError } from './handlers.js';
import { customErrors } from './errors.js';

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
        const statusCode = res.statusCode;
        if (statusCode > 299) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }
    });
    next();
}

export function middlewareMetricsInc(_: Request, __: Response, next: NextFunction): void {
    config.fileserverHits++;
    next();
}

export function middlewareError(err: Error, _: Request, res: Response,__: NextFunction): void {
    for (const error of customErrors) {
        if (err instanceof error) {
            respondWithError(res, err.message, err.code);
            return;
        }
    }
    respondWithError(res, 'Something went wrong on our end', 500);
}
