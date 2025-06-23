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
app.get('/healthz', handlerReadiness);
app.get('/metrics', handlerMetrics);
app.get('/reset', handlerReset);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
