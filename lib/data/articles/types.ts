export interface ArticleAuthor {
  name: string;
  role: string;
  organisation?: string;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: ArticleAuthor;
  tags: string[];
  featured?: boolean;
  takeaways?: string[];
  content: string;
}
