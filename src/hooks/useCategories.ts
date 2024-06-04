import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchCategories } from "../api/category.api";
import { Category } from "../models/category.model";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isActive:
          (category.id ? category.id.toString() : category.id) ===
          params.get("category_id"),
      }))
    );
  };

  useEffect(() => {
    fetchCategories().then((categories) => {
      if (!categories) return;

      setCategories([{ id: null, name: "전체" }, ...categories]);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { categories };
};

export default useCategories;
