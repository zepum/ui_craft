import { getContentSlugs } from '@/utils/content';
import Link from 'next/link';

export default async function CraftsPage() {
  const contents = await getContentSlugs();

  const filteredContents = contents.filter(content => process.env.NODE_ENV !== 'production' || !content.meta.draft);

  return (
    <div>
      {filteredContents.map(content => (
        <Link key={content.slug} href={`/crafts/${content.slug}`}>
          {content.slug}
        </Link>
      ))}
    </div>
  );
}
