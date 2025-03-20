"use client";
import { useState, useEffect } from "react";
import type { Category } from "@/lib/types";
const SearchDropdown = ({
  items,
  onSelect,
}: {
  items: Category[];
  onSelect: (item: Category) => Promise<void>;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    const name = item.name;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    if (!query) return;

    const exactMatch = items.find((item) => {
      const name = typeof item === "string" ? item : item.name;
      return name.toLowerCase() === query.toLowerCase();
    });

    if (exactMatch && onSelect) {
      onSelect(exactMatch);
    }
  }, [query, items, onSelect]);

  const handleSelect = (item: Category) => {
    if (onSelect) {
      onSelect(item);
    }
    setQuery(item.name);
    setIsOpen(false);
  };

  return (
    <div className="w-64 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={"search"}
        className="border rounded-md text-gray-800 w-full focus:outline-none focus:ring-[#D20653] focus:ring-2 px-4 py-2 transition-all"
      />

      {isOpen && filteredItems.length > 0 && (
        <ul className="bg-white border rounded-md shadow-lg w-full absolute max-h-60 mt-1 overflow-y-auto z-10">
          {filteredItems.map((item, index) => {
            const name = typeof item === "string" ? item : item.name;
            const id = typeof item === "string" ? index : item.id;
            return (
              <li
                key={id}
                onClick={() => handleSelect(item)}
                className="text-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-[#D20653] hover:text-white hover:to-[#FF951D] px-4 py-2 transition-colors"
              >
                {name}
              </li>
            );
          })}
        </ul>
      )}

      {isOpen && filteredItems.length === 0 && query && (
        <div className="bg-white border rounded-md shadow-lg text-gray-500 w-full absolute mt-1 px-4 py-2 z-10">
          No results found
        </div>
      )}
    </div>
  );
};
export default SearchDropdown;
