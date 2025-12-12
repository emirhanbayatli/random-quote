export interface Quote {
  quote: string;
  author: string;
  likedBy: string[];
  dislikedBy: string[];
  isFavorite?: boolean;
  id: string;
  createdBy?: string;
}
export interface EditableQuoteCardProps {
  quote: string;
  author: string;
}
