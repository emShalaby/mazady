"use client";

import { useState, useEffect } from "react";
import { getAllCategories, getCategoryProperties } from "@/app/actions";
import type { Category, Property } from "@/lib/types";
import SearchDropdownUi from "../Components/SearchDropdownUi";

export default function CategorySelector() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [subcategories, setSubcategories] = useState<Property[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<
    {
      id: number;
      subcategoryId: number;
    }[]
  >([]);

  console.log(selectedSubcategoryIds);
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

  useEffect(() => {
    if (!selectedCategoryId) return;
    const fetchCategoryProperties = async () => {
      try {
        const data = await getCategoryProperties(selectedCategoryId);
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching Subcategories:", error);
      }
    };
    fetchCategoryProperties();
  }, [selectedCategoryId]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Select a Category</h1>
        <SearchDropdownUi
          items={categories}
          onSelect={(item) => setSelectedCategoryId(item.id)}
          label="Select Category"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Select a subcategory</h1>
        {subcategories.map((subcategory) => {
          return (
            <SearchDropdownUi
              key={subcategory.id}
              items={subcategory.options}
              onSelect={(item) =>
                setSelectedSubcategoryIds((prev) => {
                  const clone = [...prev];
                  const _subcategory = clone.find(
                    (sub) => sub.subcategoryId === subcategory.id
                  );

                  if (_subcategory) {
                    _subcategory.id = item.id;
                    return clone;
                  } else {
                    return [
                      ...clone,
                      { subcategoryId: subcategory.id, id: item.id },
                    ];
                  }
                })
              }
              label={subcategory.name}
            />
          );
        })}
      </div>
    </>
  );
}
