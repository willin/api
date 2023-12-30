import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('package', {
    description: 'Create a new hono package',
    prompts: [
      {
        type: 'input',
        name: 'folder',
        message: 'What is the name of the new mono repo?',
        validate: (input: string) => {
          if (input.includes(' ')) {
            return 'file name cannot include spaces';
          }
          if (!input) {
            return 'file name is required';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of package should be created?',
        choices: ['packages', 'shared']
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: '{{ turbo.paths.root }}/{{ type }}/{{ dashCase folder }}',
        base: 'templates/package',
        templateFiles: 'templates/package/.*'
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ type }}/{{ dashCase folder }}/package.json',
        templateFile: 'templates/package.json.{{type}}.hbs'
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/{{ type }}/{{ dashCase folder }}/tsconfig.json',
        templateFile: 'templates/tsconfig.json.{{type}}.hbs'
      }
    ]
  });
}
