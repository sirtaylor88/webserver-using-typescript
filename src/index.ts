import express from 'express';
import { handlerReadiness, handlerMetrics, handlerReset } from './handlers.js';
import { middlewareLogResponses, middlewareMetricsInc } from './middleware.js';

const app = express();
const PORT = 8080;

// Middleware
app.use(middlewareLogResponses);

// Static files
app.use('/app', middlewareMetricsInc, express.static('./src/app'));

// Endpoints
app.get('/api/healthz', handlerReadiness);
app.get('/admin/metrics', handlerMetrics);
app.get('/admin/reset', handlerReset);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
