'use server';

import fs from 'node:fs';
import path from 'node:path';
import { craftMetadataSchema } from './metadata.schema';

export const getContentSlugs = async () => {
  const contentDir = path.join(process.cwd(), 'src/content');
  const files = fs.readdirSync(contentDir);

  const mdxFiles = files.filter(file => file.endsWith('.mdx'));

  return Promise.all(
    mdxFiles.map(async file => ({
      slug: file.replace('.mdx', ''),
      meta: (await getContentMdx(file.replace('.mdx', ''))).meta,
    })),
  );
};

export const getContentMdx = async (slug: string) => {
  const { default: Mdx, metadata } = await import(`@/content/${slug}.mdx`);

  const meta = craftMetadataSchema.parse(metadata);

  return {
    Mdx,
    meta,
  };
};
