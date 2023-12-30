import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { timing } from 'hono/timing';

const app = new Hono({
  strict: false
});

app.use(
  '*',
  timing({
    totalDescription: false,
    crossOrigin: true
  })
);

app.use(
  '*',
  cors({
    origin: '*',
    credentials: true,
    exposeHeaders: [
      'content-length',
      'x-powered-by',
      'timing-allow-origin',
      'server-timing'
    ],
    maxAge: 3600
  })
);

export function getVersion(pkg: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return typeof pkg === 'object' ? pkg?.version : 'unknown';
}

export { app };
