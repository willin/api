# Zod body validator middleware for Hono

The validator middleware using [Zod](https://zod.dev) for [Hono](https://honojs.dev) applications.
You can write a schema with Zod and validate the incoming values.

For more details: <https://github.com/willin/api>

## Usage

```ts
import { z } from 'zod';
import { zBodyValidator } from '@hono-dev/zod-body-validator';

const schema = z.object({
  name: z.string(),
  age: z.number()
});

app.post('/author', zBodyValidator(schema), (c) => {
  const data = c.req.valid('form');
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`
  });
});
```

Hook:

```ts
app.post(
  '/post',
  zBodyValidator(schema, (result, c) => {
    if (!result.success) {
      return c.text('Invalid!', 400);
    }
  })
  //...
);
```

## 赞助 Sponsor

维护者 Owner： [Willin Wang](https://willin.wang)

如果您对本项目感兴趣，可以通过以下方式支持我：

- 关注我的 Github 账号：[@willin](https://github.com/willin) [![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin)
- 参与 [爱发电](https://afdian.net/@willin) 计划
- 支付宝或微信[扫码打赏](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)

Donation ways:

- Github: <https://github.com/sponsors/willin>
- Paypal: <https://paypal.me/willinwang>
- Alipay or Wechat Pay: [QRCode](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)

## 许可证 License

Apache 2.0

This software uses:

- [@hono/zod-validator](https://github.com/honojs/middleware/tree/main/packages/zod-validator)
