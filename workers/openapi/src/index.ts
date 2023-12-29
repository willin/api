import app from '@shared/hono-app';

app.get('/', (c) => c.text('This is OPENAPI!'));

export default app;
