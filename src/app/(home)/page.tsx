"use client";

import { useState, useEffect } from "react";
import { getAllCategories, getCategoryProperties } from "@/app/actions";
import type { Category, Property } from "@/lib/types";
import SearchDropdownUi from "../Components/UI/SearchDropdownUi";
import OptionsList from "../Components/OptionsList";

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
  const [submittedValues, setSubmittedValues] = useState<
    [string, FormDataEntryValue][]
  >([]);

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

  const handleSubmit = (formData: FormData) => {
    const keyValues = Array.from(formData.entries()).filter(
      ([, value]) => value !== ""
    );
    setSubmittedValues(keyValues);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <form action={handleSubmit}>
        <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
          <h1 className="text-2xl mb-4">Select a Category</h1>
          <SearchDropdownUi
            items={categories}
            onSelect={(item) => {
              setSelectedCategoryId(item.id);
              setSelectedSubcategoryIds([]);
            }}
            label="Main Category"
          />
        </div>
        {!!selectedCategoryId && (
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4 ">
            <h1 className="text-2xl mb-4">Select Subcategory</h1>

            <div className="space-y-4 ">
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
            <div className="mt-4">
              {selectedSubcategoryIds.length > 0 && (
                <h1 className="text-2xl mb-4">Select Options</h1>
              )}

              {selectedSubcategoryIds
                .map((e) => e.id)
                .map((id) => (
                  <OptionsList id={id} key={id} />
                ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors hover:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>

      {submittedValues.length > 0 && (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg mb-4 font-medium">Submitted Values</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Field Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submittedValues.map(([key, value], index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {value.toString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
