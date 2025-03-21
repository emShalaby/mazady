"use client";
import { useState } from "react";
import type { Category, Option, Property } from "@/lib/types";
import { getOptionProperties } from "@/app/actions";
import SearchDropdownUi from "./SearchDropdownUi";

interface SearchDropdownProps {
  items: Category[];
  onSelect: (item: Category) => Promise<Property[]>;
  label: string;
}

const SearchDropdown = ({ items, onSelect, label }: SearchDropdownProps) => {
  const [childDropdownsValues, setChildDropdownsValues] = useState<
    (Property[] | Option[])[]
  >([]);
  const [childDropdownsLabels, setChildDropdownsLabels] = useState<string[]>(
    []
  );

  const handleCategorySelect = async (value: { id: number; name: string }) => {
    setChildDropdownsLabels([]);
    setChildDropdownsValues([]);
    const category = items.find((item) => item.id === value.id);
    const CategoryProperties = category ? await onSelect(category) : null;
    if (CategoryProperties)
      CategoryProperties.forEach((prop) => {
        setChildDropdownsValues((prev) => {
          return [...prev, prop.options];
        });
        setChildDropdownsLabels((prev) => {
          return [...prev, prop.name];
        });
      });
  };
  const handleOptionSelect = async (value: { name: string; id: number }) => {
    const optionProperties = await getOptionProperties(value.id);
    const hasNoChildren = optionProperties.some((e) => e.options.length === 0);
    if (hasNoChildren) {
      setChildDropdownsLabels((prev) => [...prev, value.name]);
      setChildDropdownsValues((prev) => [...prev, optionProperties]);
    } else
      optionProperties.forEach(async (prop) => {
        setChildDropdownsLabels((prev) => {
          return [...prev, prop.name];
        });
        setChildDropdownsValues((prev) => {
          return [...prev, prop.options];
        });
      });
  };
  const handleCategoryChange = () => {
    setChildDropdownsLabels([]);
    setChildDropdownsValues([]);
  };
  return (
    <div className="w-64 relative">
      <SearchDropdownUi
        items={items.map((item) => {
          return { name: item.name, id: item.id };
        })}
        label={label}
        onSelect={handleCategorySelect}
        onChange={handleCategoryChange}
      />
      {childDropdownsValues.length > 0 && (
        <div className="mt-4 space-y-4">
          {childDropdownsValues.map((childItems, index) => (
            <SearchDropdownUi
              key={index}
              items={childItems.map((child) => {
                return { name: child.name, id: child.id };
              })}
              label={childDropdownsLabels[index]}
              onSelect={(item) => handleOptionSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
