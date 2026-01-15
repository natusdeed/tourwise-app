/**
 * Content Management System
 * 
 * Handles reading and parsing markdown/JSON content files
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface ContentFrontmatter {
  title: string;
  description: string;
  slug?: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  vertical?: string;
  featured?: boolean;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  [key: string]: any; // Allow additional frontmatter fields
}

export interface ContentItem {
  frontmatter: ContentFrontmatter;
  content: string;
  htmlContent?: string;
  slug: string;
}

/**
 * Get content directory path
 */
function getContentDirectory(type: 'destinations' | 'blog' | 'guides'): string {
  return path.join(process.cwd(), 'content', type);
}

/**
 * Read all markdown files from a directory
 */
export async function getContentFiles(
  type: 'destinations' | 'blog' | 'guides',
  vertical?: string
): Promise<string[]> {
  const contentDir = getContentDirectory(type);
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  let files = fs.readdirSync(contentDir);
  
  // Filter for markdown files
  files = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  
  // Filter by vertical if specified
  if (vertical) {
    const filteredFiles: string[] = [];
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      if (data.vertical === vertical || data.vertical === 'all') {
        filteredFiles.push(file);
      }
    }
    return filteredFiles;
  }
  
  return files;
}

/**
 * Read and parse a single content file
 */
export async function getContentItem(
  type: 'destinations' | 'blog' | 'guides',
  slug: string,
  vertical?: string
): Promise<ContentItem | null> {
  const contentDir = getContentDirectory(type);
  const files = await getContentFiles(type, vertical);
  
  const file = files.find(f => {
    const filePath = path.join(contentDir, f);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const fileSlug = data.slug || f.replace(/\.(md|mdx)$/, '');
    return fileSlug === slug;
  });

  if (!file) {
    return null;
  }

  const filePath = path.join(contentDir, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Process markdown to HTML
  const processedContent = await remark().use(remarkHtml).process(content);
  const htmlContent = processedContent.toString();
  
  const fileSlug = data.slug || file.replace(/\.(md|mdx)$/, '');
  
  return {
    frontmatter: data as ContentFrontmatter,
    content,
    htmlContent,
    slug: fileSlug,
  };
}

/**
 * Get all content items from a directory
 */
export async function getAllContentItems(
  type: 'destinations' | 'blog' | 'guides',
  vertical?: string,
  limit?: number
): Promise<ContentItem[]> {
  const files = await getContentFiles(type, vertical);
  const items: ContentItem[] = [];
  
  for (const file of files) {
    const contentDir = getContentDirectory(type);
    const filePath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark().use(remarkHtml).process(content);
    const htmlContent = processedContent.toString();
    
    const fileSlug = data.slug || file.replace(/\.(md|mdx)$/, '');
    
    items.push({
      frontmatter: data as ContentFrontmatter,
      content,
      htmlContent,
      slug: fileSlug,
    });
  }
  
  // Sort by date (newest first) or by featured
  items.sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    }
    return 0;
  });
  
  return limit ? items.slice(0, limit) : items;
}

/**
 * Get content items by tag
 */
export async function getContentByTag(
  type: 'destinations' | 'blog' | 'guides',
  tag: string,
  vertical?: string
): Promise<ContentItem[]> {
  const allItems = await getAllContentItems(type, vertical);
  return allItems.filter(item => 
    item.frontmatter.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get related content items
 */
export async function getRelatedContent(
  currentItem: ContentItem,
  type: 'destinations' | 'blog' | 'guides',
  limit: number = 3
): Promise<ContentItem[]> {
  const allItems = await getAllContentItems(type, currentItem.frontmatter.vertical);
  
  // Filter out current item
  const otherItems = allItems.filter(item => item.slug !== currentItem.slug);
  
  // Score items based on shared tags and category
  const scoredItems = otherItems.map(item => {
    let score = 0;
    
    // Shared tags
    if (currentItem.frontmatter.tags && item.frontmatter.tags) {
      const sharedTags = currentItem.frontmatter.tags.filter(tag =>
        item.frontmatter.tags!.includes(tag)
      );
      score += sharedTags.length * 10;
    }
    
    // Same category
    if (currentItem.frontmatter.category === item.frontmatter.category) {
      score += 5;
    }
    
    // Same vertical
    if (currentItem.frontmatter.vertical === item.frontmatter.vertical) {
      score += 3;
    }
    
    return { item, score };
  });
  
  // Sort by score and return top items
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
