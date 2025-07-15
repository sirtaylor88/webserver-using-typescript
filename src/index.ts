import express from 'express';
import { handlerReadiness, handlerMetrics, handlerReset, handlerValidate, handlerCreateUser } from './handlers.js';
import { middlewareError, middlewareLogResponses, middlewareMetricsInc } from './middleware.js';

import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from './config.js';

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();
const PORT = 8080;

// Middleware
app.use(middlewareLogResponses);

// Need to add JSON middleware to parse JSON
app.use(express.json());

// Static files
app.use('/app', middlewareMetricsInc, express.static('./src/app'));

// Endpoints
app.get('/api/healthz', (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.get('/admin/metrics', (req, res, next) => {
    Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.post('/admin/reset', (req, res, next) => {
    Promise.resolve(handlerReset(req, res)).catch(next);
});
app.post('/api/validate_chirp', (req, res, next) => {
    Promise.resolve(handlerValidate(req, res)).catch(next);
});
app.post('/api/users', (req, res, next) => {
    Promise.resolve(handlerCreateUser(req, res)).catch(next);
})
app.use(middlewareError);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
