import { Service } from '@freshgum/typedi';
import { Get, Post, Route } from '@hono-dev/zod-openapi-decorators';
import { Context } from 'hono';
import { openApiSpec } from './openpai';

@Route('/auth')
@Service([])
export class HelloController {
  constructor() {
    //
  }

  @Get('/hello', { openapi: openApiSpec })
  @Post('/hello', { openapi: openApiSpec })
  index(c: Context) {
    return c.json(
      {
        message1: 'Hello, world!'
      },
      200
    );
  }
}
