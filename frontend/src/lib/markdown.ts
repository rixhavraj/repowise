import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
export async function parseDocument(raw: string, filePath: string) {
  const parsed = matter(raw); const data = parsed.data as Record<string, unknown>;
  const fallback = filePath.split('/').pop()!.replace(/\.md$/i,'').replace(/[-_]+/g,' ').replace(/\b\w/g, c => c.toUpperCase());
  const html = String(await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeHighlight).use(rehypeSanitize).use(rehypeStringify).process(parsed.content));
  return { title: typeof data.title === 'string' ? data.title : fallback, description: typeof data.description === 'string' ? data.description : '', category: typeof data.category === 'string' ? data.category : null, tags: Array.isArray(data.tags) ? data.tags.map(String) : [], published: data.published === true, contentMarkdown: parsed.content, contentHtml: html };
}
export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
