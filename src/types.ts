export interface Quote {
  quote: string;
  author: string;
  likedBy: number;
  isFavorite?: boolean;
  id: string;
}

export interface NavbarProps {
  setCurrentPage: (page: any) => void;
  pages: {
    home: any;
    profile: any;
    [key: string]: any;
  };
}

export interface BtnProps {
  label: string;
  handleOnClick: () => void;
  className?: string;
}
export interface QuoteCardProps {
  quote: string;
  author: string;
  likedBy: number;
}
