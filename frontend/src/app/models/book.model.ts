import { User } from './auth.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string | null;
  description: string | null;
  userId: number;
  user?: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface BookDto {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string | null;
  description: string | null;
}
