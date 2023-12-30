import { OpenAPIHono, createRoute } from '@hono-dev/zod-openapi';
import app from './app';
import {
  ROUTE_PATHS,
  ROUTE_PREFIXES,
  pathsContainer,
  routerContainer
} from './container';

export type RouteConfig = Omit<Parameters<OpenAPIHono['openapi']>[0], 'method'>;
export type OpenApiOptions = Omit<RouteConfig, 'path'>;

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type MethodConfig = {
  path: string;
  def: Omit<Parameters<OpenAPIHono['openapi']>[0], 'path' | 'method'>;
  methodName: string;
  method: Lowercase<HTTPMethods>;
  parent: string;
  options: MethodOptions;
};

export type MethodOptions = {
  openapi: OpenApiOptions;
};

export function Route(prefix: string = ''): ClassDecorator {
  return (targetConstructor) => {
    const routes = pathsContainer.getMany(ROUTE_PATHS).filter(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (item: any) => item.parent === targetConstructor.name
    ) as MethodConfig[];

    routerContainer.set({
      id: ROUTE_PREFIXES,
      value: {
        prefix,
        name: targetConstructor.name,
        value: targetConstructor
      },
      multiple: true
    });

    const hono = new OpenAPIHono({
      defaultHook: (ctx, c) => {
        if (!ctx.success) {
          return c.json({
            errors: ctx.error.flatten().fieldErrors
          });
        }
      }
    });

    for (const route of routes) {
      if (typeof hono[route.method] !== 'function') {
        throw new Error(`Method ${route.method} not found on hono`);
      }

      hono.openapi(
        {
          ...route.def,
          method: route.method,
          path: route.path
        },
        (c) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const controller = routerContainer.get(targetConstructor);

          if (!controller) {
            throw new Error('Controller not found');
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const method = Reflect.get(controller, route.methodName);

          if (typeof method !== 'function') {
            throw new Error(
              `Method ${route.methodName} not found on controller`
            );
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          return Reflect.apply(method, controller, [c]);
        }
      );
    }
    app.route(prefix, hono);
  };
}

function MethodDecoratorFactory(method: HTTPMethods) {
  return (
    path: string = '',
    options: MethodOptions = {} as MethodOptions
  ): MethodDecorator => {
    return (targetConstructor, methodName) => {
      pathsContainer.set({
        id: ROUTE_PATHS,
        value: {
          path,
          methodName,
          method: method.toLowerCase(),
          def: createRoute({
            method: method.toLowerCase() as MethodConfig['method'],
            path,
            ...options.openapi
          }),
          parent: targetConstructor.constructor.name,
          options
        } as MethodConfig,
        multiple: true
      });
    };
  };
}

export const Get = MethodDecoratorFactory('GET');
export const Post = MethodDecoratorFactory('POST');
export const Put = MethodDecoratorFactory('PUT');
export const Delete = MethodDecoratorFactory('DELETE');
