"use client";
import { useState } from "react";
type ItemType = {
  name: string;
  id: number;
};
interface SearchDropdownPropsUi {
  items: ItemType[];
  onSelect: (item: ItemType) => Promise<void> | void;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchDropdownUi = ({
  items,
  onSelect,
  label,
  onChange,
}: SearchDropdownPropsUi) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  const handleSelect = async (item: ItemType) => {
    setQuery(item.name);
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="w-64 relative">
      <label htmlFor="search-bar">{label}</label>
      <input
        type="text"
        name="search-bar"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onChange) onChange(e);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="search"
        className="border rounded-md text-gray-800 w-full focus:outline-none focus:ring-[#D20653] focus:ring-2 px-4 py-2 transition-all"
      />

      {isOpen && filteredItems.length > 0 && (
        <ul className="bg-white border rounded-md shadow-lg w-full absolute max-h-60 mt-1 overflow-y-auto z-10">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handleSelect(item);
              }}
              className="text-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-[#D20653] hover:text-white hover:to-[#FF951D] px-4 py-2 transition-colors"
            >
              {item.name}
            </li>
          ))}
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

export default SearchDropdownUi;
