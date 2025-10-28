import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: Team[];
    link?: string;
    author?: string;
};

function getMDXFiles(dir: string) {
    if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`);
    }

    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);

    const metadata: Metadata = {
        title: data.title || '',
        publishedAt: data.publishedAt || '',
        summary: data.summary || '',
        image: data.image || '',
        images: data.images || [],
        tag: data.tag || [],
        team: data.team || [],
        link: data.link || '',
        author: data.author || '',
    };

    return { metadata, content };
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

export function getPosts(customPath = ['', '', '', '']) {
    const postsDir = path.join(process.cwd(), ...customPath);
    return getMDXData(postsDir);
}

/**
 * Resolves an image URL to its absolute URL
 * Handles both local paths (starts with /) and absolute URLs (starts with http:// or https://)
 * @param imageUrl - The image URL from metadata (can be relative or absolute)
 * @param baseURL - The base URL of the site
 * @param fallback - Optional fallback image path
 * @returns Absolute URL string
 */
export function resolveImageUrl(
  imageUrl: string | undefined,
  baseURL: string,
  fallback?: string
): string {
  if (!imageUrl) {
    return fallback ? `${baseURL}${fallback}` : '';
  }
  
  // If image is already an absolute URL, return it as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If image is a relative path, prepend baseURL
  return `${baseURL}${imageUrl}`;
}