import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories } from "../api/category.api";
import { Category } from "../models/category.model";
import useFetch from "./useFetch";

export const useCategories = () => {
  const { data, isLoading, error } = useFetch(fetchCategories, []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryIdSearchParam = searchParams.get("category_id");

  const changeActive = useCallback(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isActive:
          (category.id ? category.id.toString() : category.id) ===
          categoryIdSearchParam,
      }))
    );
  }, [categoryIdSearchParam]);

  useEffect(() => {
    if (!data) return;

    setCategories([{ id: null, name: "전체" }, ...data]);
    changeActive();
  }, [data]);

  useEffect(() => {
    changeActive();
    setSearchParams((prev) => {
      prev.set("page", "1");
      return prev;
    });
  }, [changeActive]);

  return { categories, isLoading, error };
};

export default useCategories;
