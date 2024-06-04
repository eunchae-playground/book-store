export interface Book {
  id: number;
  categoryId: number;
  title: string;
  bookFormat: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  totalPages: number;
  tableOfContents: string;
  price: number;
  pubDate: string;
  image: string;
  isLiked?: number;
  likeCount: number;
  categoryName: string;
}
