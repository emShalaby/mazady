"use client";
import { OTHER_ID, OTHER_LABEL } from "@/lib/constants";
import { useState } from "react";
export type ItemType = {
  name: string;
  id: number;
};
interface SearchDropdownPropsUi {
  items: ItemType[];
  onSelect: (item: ItemType) => void;
  label: string;
  hasOther?: boolean;
}

const SearchDropdownUi = ({
  items,
  onSelect,
  label,
  hasOther,
}: SearchDropdownPropsUi) => {
  if (hasOther) items = [...items, { name: "Other", id: -1 }];
  const [query, setQuery] = useState("");
  const [otherQuery, setOtherQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ItemType>();
  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
  const otherLabel = label + " (Other)";

  const handleSelect = async (item: ItemType) => {
    if (selected?.name !== item.name) {
      setSelected(item);
      setQuery(item.name);
      setIsOpen(false);
      if (onSelect) onSelect(item);
    }
  };

  return (
    <div className="w-64 relative">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        name={selected?.id === OTHER_ID ? label + OTHER_LABEL : label}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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

      {selected?.id === OTHER_ID && (
        <div>
          <label htmlFor={otherLabel}>{otherLabel}</label>
          <input
            type="text"
            name={otherLabel}
            value={otherQuery}
            onChange={(e) => {
              setOtherQuery(e.target.value);
            }}
            placeholder="Enter custom option"
            className="border rounded-md text-gray-800 w-full focus:outline-none focus:ring-[#D20653] focus:ring-2 px-4 py-2 transition-all"
          />
        </div>
      )}
    </div>
  );
};

export default SearchDropdownUi;
