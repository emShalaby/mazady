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

  const isValidOption = (value: Option | null): value is Option =>
    value !== null;
  const nestedOptions = options
    .map((parentOption) => {
      const selectedParentOption = selectedOptionIds.find(
        (selection) => selection.parentId === parentOption.id
      );
      if (selectedParentOption) {
        const childOption = parentOption.options.find(
          (option) =>
            option.id === selectedParentOption.childId && option.has_child
        );
        return childOption ?? null;
      } else return null;
    })
    .filter(isValidOption);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await getOptionProperties(id);
        setOptions(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [id]);

  const handleSelect = (
    selectedItem: { id: number; name: string },
    parentId: number
  ) =>
    setSelectedOptionIds((prevSelections) => {
      const updatedSelections = [...prevSelections];
      const existingSelection = updatedSelections.find(
        (selection) => selection.parentId === parentId
      );

      if (existingSelection) {
        existingSelection.childId = selectedItem.id;
        return updatedSelections;
      } else {
        return [...updatedSelections, { parentId, childId: selectedItem.id }];
      }
    });

  return (
    <div>
      {options
        .map((option) => option.options)
        .some((optionList) => optionList.length === 0) ? (
        <SearchDropdownUi
          items={options}
          label={name ?? ""}
          onSelect={(item) => handleSelect(item, id)}
          hasOther
        />
      ) : (
        <>
          {options.map((parentOption) => {
            return (
              <SearchDropdownUi
                key={parentOption.id}
                items={parentOption.options}
                onSelect={(item) => handleSelect(item, parentOption.id)}
                label={parentOption.name}
                hasOther
              />
            );
          })}
          {nestedOptions.map((childOption) => (
            <OptionsList
              id={childOption.id}
              key={childOption.id}
              name={childOption.name}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default OptionsList;
