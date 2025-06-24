import type { User } from "firebase/auth";
import type { ReactNode } from "react";
export interface Quote {
  quote: string;
  author: string;
  likedBy: number;
  isFavorite?: boolean;
  id: string;
  whoAddQuote?: string;
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
  handleOnClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
export interface QuoteCardProps {
  quote: string;
  author: string;
  likedBy?: number;
}

export type AuthContextType = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<any>;
  createAccount: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  loading: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export interface EditableQuoteCardProps {
  quote: string;
  author: string;
}
