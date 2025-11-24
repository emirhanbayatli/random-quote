export interface Quote {
  quote: string;
  author: string;
  likedBy: number;
  isFavorite?: boolean;
  id: string;
  whoAddQuote?: string;
}
export interface EditableQuoteCardProps {
  quote: string;
  author: string;
}
