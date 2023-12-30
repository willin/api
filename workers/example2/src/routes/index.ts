import { swaggerUI } from '@hono/swagger-ui';
import { app } from '@hono-dev/zod-openapi-decorators';
import './auth/controller';

app.get(
  '/auth/ui',
  swaggerUI({
    url: '/auth/doc'
  })
);

app.doc('/auth/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0',
  tags: [
    {
      name: 'pet',
      description: 'Everything about your Pets',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io'
      }
    },
    {
      name: 'store',
      description: 'Access to Petstore orders',
      externalDocs: {
        description: 'Find out more about our store',
        url: 'http://swagger.io'
      }
    },
    {
      name: 'user',
      description: 'Operations about user'
    }
  ]
});

export const routes = app;
