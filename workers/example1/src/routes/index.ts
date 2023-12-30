import { swaggerUI } from '@hono/swagger-ui';
import { app } from '@hono-dev/zod-openapi-decorators';
import './app/controller';
import { z } from 'zod';

app.openAPIRegistry.registerWebhook({
  method: 'post',
  path: 'newPet',
  requestBody: {
    description: 'Information about a new pet in the system',
    content: {
      'application/json': {
        schema: z.object({ name: z.string() })
      }
    }
  },
  responses: {
    '200': {
      description:
        'Return a 200 status to indicate that the data was received successfully'
    }
  }
});

app.get(
  '/app/ui',
  swaggerUI({
    url: '/app/doc'
  })
);

app.doc('/app/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
});

export const routes = app;
