import app from '@shared/hono-app';

app.get('/auth', (c) => c.text('This is SSO!'));

export default app;
