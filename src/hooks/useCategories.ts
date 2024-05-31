import { useEffect, useState } from "react";
import { fetchCategories } from "../api/category.api";
import { Category } from "../models/category.model";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      if (!categories) return;

      setCategories([{ id: null, name: "전체" }, ...categories]);
    });
  }, []);

  return { categories };
};

export default useCategories;
