import { createRoute, z } from '@hono-dev/zod-openapi';

export const openApiSpec = createRoute({
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().openapi('name')
          })
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Retrieve the user'
    }
  }
});
