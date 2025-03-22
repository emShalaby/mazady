import React, { useEffect, useState } from "react";
import { getOptionProperties } from "../actions";
import { Option, Property } from "@/lib/types";
import SearchDropdownUi from "./UI/SearchDropdownUi";

const OptionsList = ({ id, name }: { id: number; name?: string }) => {
  const [options, setOptions] = useState<Property[]>([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState<
    {
      childId: number;
      parentId: number;
    }[]
  >([]);
  const filterFn = (value: Option | null): value is Option => value !== null;
  const optionsHasOptions = options
    .map((opt) => {
      const selectedOption = selectedOptionIds.find(
        (o) => o.parentId === opt.id
      );
      if (selectedOption) {
        const optionOptions = opt.options.find(
          (op) => op.id === selectedOption.childId && op.has_child
        );
        return optionOptions ?? null;
      } else return null;
    })
    .filter(filterFn);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getOptionProperties(id);
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [id]);

  const handleSelect = (item: { id: number; name: string }, id: number) =>
    setSelectedOptionIds((prev) => {
      const clone = [...prev];
      const _option = clone.find((opt) => opt.parentId === id);

      if (_option) {
        _option.childId = item.id;
        return clone;
      } else {
        return [...clone, { parentId: id, childId: item.id }];
      }
    });

  return (
    <div>
      {options.map((opts) => opts.options).some((a) => a.length === 0) ? (
        <SearchDropdownUi
          items={options}
          label={name ?? ""}
          onSelect={(item) => handleSelect(item, id)}
        />
      ) : (
        <>
          {options.map((option) => {
            return (
              <SearchDropdownUi
                key={option.id}
                items={option.options}
                onSelect={(item) => handleSelect(item, option.id)}
                label={option.name}
              />
            );
          })}
          {optionsHasOptions.map((opt) => (
            <OptionsList id={opt.id} key={opt.id} name={opt.name} />
          ))}
        </>
      )}
    </div>
  );
};

export default OptionsList;
