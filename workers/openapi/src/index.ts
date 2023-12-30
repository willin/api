/* eslint-disable */
import { swaggerUI } from '@hono/swagger-ui';
import { app } from '@hono-dev/zod-openapi-decorators';
import { merge, isErrorResult } from 'openapi-merge';

app.get(
  '/',
  swaggerUI({
    url: '/doc'
  })
);

app.get('/doc', async (c) => {
  const oas1 = await fetch('https://api.css.fund/auth/doc').then((res) =>
    res.json()
  );
  const oas2 = await fetch('https://api.css.fund/app/doc').then((res) =>
    res.json()
  );
  const mergeResult = merge([
    {
      oas: oas1
    },
    {
      oas: oas2
    }
  ]);
  if (isErrorResult(mergeResult)) {
    // Oops, something went wrong
    console.error(`${mergeResult.message} (${mergeResult.type})`);
  } else {
    console.log(`Merge successful!`);
    console.log(JSON.stringify(mergeResult.output, null, 2));
  }
  return c.json(
    {
      ...mergeResult.output,
      openapi: '3.1.0'
    },
    200
  );
});

export default app;
