export interface Category {
  id: number | null;
  name: string;
  isActive?: boolean;
}

export type CategoriesResponse = Array<{
  id: number;
  name: string;
}>;
