import { getContentMdx, getContentSlugs } from '@/utils/content';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { Mdx, meta } = await getContentMdx(slug);

  if (process.env.NODE_ENV === 'production' && meta.draft) {
    return notFound();
  }

  return (
    <>
      <div className={styles.gridBackground} />
      <div>
        <h1>{slug}</h1>
        <p>{meta.draft ? 'draft' : 'published'}</p>
      </div>
      <Mdx />
    </>
  );
}

export async function generateStaticParams() {
  return await getContentSlugs();
}

export const dynamicParams = false;
