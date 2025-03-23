import SearchDropdownUi, {
  ItemType,
} from "@/app/Components/UI/SearchDropdownUi";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("SearchDropdownUi", () => {
  const mockItems: ItemType[] = [
    { name: "Apple", id: 1 },
    { name: "Banana", id: 2 },
    { name: "Cherry", id: 3 },
  ];
  const mockOnSelect = jest.fn();

  test("renders the input with label and placeholder", () => {
    render(
      <SearchDropdownUi
        items={mockItems}
        onSelect={mockOnSelect}
        label="Fruit Search"
      />
    );

    const label = screen.getByText("Fruit Search");
    const input = screen.getByPlaceholderText("search");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("filters items when typing and shows dropdown", () => {
    render(
      <SearchDropdownUi
        items={mockItems}
        onSelect={mockOnSelect}
        label="Fruit Search"
      />
    );

    const input = screen.getByPlaceholderText("search");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "a" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  });

  test("selects an item, updates input, and calls onSelect", () => {
    render(
      <SearchDropdownUi
        items={mockItems}
        onSelect={mockOnSelect}
        label="Fruit Search"
      />
    );

    const input = screen.getByPlaceholderText("search");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "ban" } });

    const bananaOption = screen.getByText("Banana");
    fireEvent.click(bananaOption);

    expect(input).toHaveValue("Banana");
    expect(mockOnSelect).toHaveBeenCalledWith({ name: "Banana", id: 2 });
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  test("shows no results message when query has no matches", () => {
    render(
      <SearchDropdownUi
        items={mockItems}
        onSelect={mockOnSelect}
        label="Fruit Search"
      />
    );

    const input = screen.getByPlaceholderText("search");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "xyz" } });

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });
});
