import 'reflect-metadata';
import { poweredBy } from '@hono-dev/powered-by';
import { app, getVersion } from '@shared/hono-app';
import pkg from '../package.json';
import { routes } from './routes';

app.use('*', poweredBy(`v0/${getVersion(pkg)}`));
app.route('/', routes);

export default app;
