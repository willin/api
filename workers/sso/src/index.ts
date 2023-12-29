import app from '@shared/hono-app';

app.get('/', (c) => c.text('This is SSO!'));

export default app;
