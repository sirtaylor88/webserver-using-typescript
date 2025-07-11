import express from 'express';
import { handlerReadiness, handlerMetrics, handlerReset, handlerValidate } from './handlers.js';
import { errorHandler, middlewareLogResponses, middlewareMetricsInc } from './middleware.js';

const app = express();
const PORT = 8080;

// Middleware
app.use(middlewareLogResponses);

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
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
