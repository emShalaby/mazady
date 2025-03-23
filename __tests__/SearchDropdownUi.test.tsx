import SearchDropdownUi, {
  ItemType,
} from "@/app/Components/UI/SearchDropdownUi";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { OTHER_ID } from "@/lib/constants";

describe("SearchDropdownUi", () => {
  const mockItems: ItemType[] = [
    { name: "Apple", id: 1 },
    { name: "Banana", id: 2 },
    { name: "Cherry", id: 3 },
  ];
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  describe("Other option behavior", () => {
    test("shows Other option in dropdown when hasOther is true", () => {
      render(
        <SearchDropdownUi
          items={mockItems}
          onSelect={mockOnSelect}
          label="Fruit Search"
          hasOther
        />
      );

      const input = screen.getByPlaceholderText("search");
      fireEvent.focus(input);

      expect(screen.getByText("Other")).toBeInTheDocument();
    });

    test("shows Other input field with correct label when Other is selected", () => {
      render(
        <SearchDropdownUi
          items={mockItems}
          onSelect={mockOnSelect}
          label="Fruit Search"
          hasOther
        />
      );

      const input = screen.getByPlaceholderText("search");
      fireEvent.focus(input);
      fireEvent.click(screen.getByText("Other"));

      expect(screen.getByText("Fruit Search (Other)")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter custom option")
      ).toBeInTheDocument();
    });

    test("handles Other option selection and custom value input", () => {
      render(
        <SearchDropdownUi
          items={mockItems}
          onSelect={mockOnSelect}
          label="Fruit Search"
          hasOther
        />
      );

      const mainInput = screen.getByPlaceholderText("search");
      fireEvent.focus(mainInput);
      fireEvent.click(screen.getByText("Other"));

      expect(mockOnSelect).toHaveBeenCalledWith({
        name: "Other",
        id: OTHER_ID,
      });
      expect(mainInput).toHaveValue("Other");

      const otherInput = screen.getByPlaceholderText("Enter custom option");
      fireEvent.change(otherInput, { target: { value: "Custom Fruit" } });
      expect(otherInput).toHaveValue("Custom Fruit");
    });

    test("maintains Other input value when main dropdown is interacted with", () => {
      render(
        <SearchDropdownUi
          items={mockItems}
          onSelect={mockOnSelect}
          label="Fruit Search"
          hasOther
        />
      );

      const mainInput = screen.getByPlaceholderText("search");
      fireEvent.focus(mainInput);
      fireEvent.click(screen.getByText("Other"));

      const otherInput = screen.getByPlaceholderText("Enter custom option");
      fireEvent.change(otherInput, { target: { value: "Custom Fruit" } });

      fireEvent.focus(mainInput);
      fireEvent.change(mainInput, { target: { value: "app" } });

      expect(otherInput).toHaveValue("Custom Fruit");
    });
  });
});
