import fs from 'node:fs/promises';
import path from 'node:path';
import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'slug',
    message: '프로젝트 폴더 이름을 입력해주세요. (띄어쓰기는 _ 로 대체됩니다.)',
    filter: input => {
      return input.toLowerCase().replace(/\s+/g, '_');
    },
  },
];

const getConfig = slug => {
  // tsconfig.json
  const tsconfig = {
    extends: '../../../tsconfig.json',
    compilerOptions: {
      module: 'ESNext',
      moduleResolution: 'bundler',
    },
    include: ['src', 'index.ts', '../../../css-module.d.ts', 'stories'],
  };

  // tsup.config.ts
  const tsupConfig = `import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  dts: true,
  clean: true,
  minify: !options.watch,
  target: 'es2022',
  format: ['esm'],
  banner: { js: '"use client";' },
  loader: {
    '.css': 'copy',
  },
  external: ['react', 'react-dom'],
}));`;

  // package.json
  const packageJson = {
    name: `@craft/${slug}`,
    version: '1.0.0',
    description: '',
    files: ['dist'],
    exports: {
      '.': {
        types: './dist/index.d.ts',
        default: './dist/index.mjs',
      },
    },
    scripts: {
      watch: 'tsup --watch',
      build: 'tsup',
      clean: 'rimraf dist .turbo',
      'clean:hard': 'rimraf dist .turbo node_modules',
      typecheck: 'tsc --noEmit',
      type: 'tsc --emitDeclarationOnly --outDir dist',
    },
    peerDependencies: {
      react: 'catalog:react19',
      'react-dom': 'catalog:react19',
    },
    dependencies: {
      gsap: 'catalog:animation',
      jotai: 'catalog:state',
      'lucide-react': 'catalog:icons',
      motion: 'catalog:animation',
    },
    devDependencies: {
      '@core/debug': 'workspace:*',
      '@types/react': 'catalog:react19',
      '@types/react-dom': 'catalog:react19',
    },
    keywords: [],
    author: '',
    license: 'ISC',
  };
  // *.stories.tsx
  const story = `import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Crafts/${changeToPascal(slug)}',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <h1>Hello</h1>,
};`;

  const cssModule = `@import url("../../../core/theme/color.css");
@import url("../../../core/theme/reset.css");`;

  return { tsconfig, tsupConfig, packageJson, story, cssModule };
};

const projectRoot = path.resolve();
const dirPath = slug => path.join(projectRoot, `packages/crafts/${slug}`);
const changeToPascal = slug => {
  if (!slug || typeof slug !== 'string') return '';

  const normalized = slug.replace(/[-_]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2');

  return normalized
    .split('_')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

const createDirectory = async slug => {
  try {
    const { tsconfig, tsupConfig, packageJson, story, cssModule } = getConfig(slug);
    const componentDir = dirPath(slug);
    const srcPath = path.join(componentDir, 'src');
    const storiesPath = path.join(componentDir, 'stories');
    const pascalFileName = changeToPascal(slug);

    // directory
    await fs.mkdir(componentDir, { recursive: true });
    await fs.mkdir(srcPath, { recursive: true });
    await fs.mkdir(storiesPath, { recursive: true });

    // file
    await fs.writeFile(path.join(componentDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
    await fs.writeFile(path.join(componentDir, 'tsup.config.ts'), tsupConfig);
    await fs.writeFile(path.join(componentDir, 'package.json'), JSON.stringify(packageJson, null, 2));
    await fs.writeFile(path.join(srcPath, 'index.ts'), '');
    await fs.writeFile(path.join(srcPath, `${pascalFileName}.tsx`), '');
    await fs.writeFile(path.join(srcPath, `${pascalFileName}.module.css`), cssModule);
    await fs.writeFile(path.join(storiesPath, `${pascalFileName}.stories.tsx`), story);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const prettyLog = slug => {
  console.log(`"\n ✅ 프로젝트가 성공적으로 생성되었습니다!"`);
  console.log(`📁 위치: ${dirPath(slug)}`);
  console.log(`📦 패키지 이름: @craft/${slug}`);
};

async function createProject() {
  try {
    const answers = await inquirer.prompt(questions);
    const { slug } = answers;

    const success = await createDirectory(slug);

    if (success) {
      prettyLog(slug);
    }
  } catch (error) {
    console.error(error);
  }
}

createProject();
