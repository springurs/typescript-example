import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { existsSync, readFileSync } from 'node:fs';
import { cors } from 'hono/cors';

const MIN_LATENCY_MS = 100;
const MAX_LATENCY_MS = 650;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomLatency = () => {
  return Math.floor(Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS)) + MIN_LATENCY_MS;
};

const app = new Hono();

app.use('/api/*', cors());

app.get('/', (c) => {
  return c.text(
    'Welcome. This is a backend server demo. Use the /api/facility endpoint to retrieve some simulated facility data.'
  );
});

app.get('/api/facilities', async (c) => {
  const filePath = `./data/facilities.json`;

  await delay(getRandomLatency());

  if (!existsSync(filePath)) {
    return c.text(`Facilities data not found`, 404);
  }

  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  return c.json(data);
});

app.get('/api/facility/:id', async (c) => {
  const { id } = c.req.param();
  const filePath = `./data/facility-${id}.json`;

  await delay(getRandomLatency());

  if (!existsSync(filePath)) {
    return c.text(`Facility ID ${id} not found`, 404);
  }

  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  return c.json(data);
});

serve(
  {
    fetch: app.fetch,
    port: 5555,
  },
  (info) => {
    console.log(`Server API is running on http://localhost:${info.port}`);
  }
);
