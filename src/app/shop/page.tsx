"use client";

import { useState, useEffect } from "react";
import { getAllCategories, getCategoryProperties } from "@/app/actions"; // Adjust the import path
import type { Category } from "@/lib/types";
import SearchDropdown from "../Components/SearchDropdown";

export default function CategorySelector() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = async (item: Category) => {
    const properties = await getCategoryProperties(item.id);
    return properties;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Select a Category</h1>
      <SearchDropdown
        items={categories}
        onSelect={handleSelect}
        label="Select Category"
      />
    </div>
  );
}
