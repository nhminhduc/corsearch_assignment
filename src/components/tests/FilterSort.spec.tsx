import { render, screen, fireEvent } from "@testing-library/react";
import FilterSort from "../FilterSort";
import "@testing-library/jest-dom";

describe("FilterSort Component", () => {
  const mockOnFilterChange = vi.fn();
  const mockOnSortChange = vi.fn();
  const onFilterFieldChange = vi.fn();

  beforeEach(() => {
    render(
      <FilterSort
        filterText=""
        onFilterChange={mockOnFilterChange}
        sortField="name"
        sortOrder="asc"
        onSortChange={mockOnSortChange}
        filterField={"name"}
        onFilterFieldChange={onFilterFieldChange}
      />
    );
  });

  test("renders input and buttons", () => {
    expect(screen.getByPlaceholderText("Filter users...")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === "Sort by Name ▲";
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Sort by Email")).toBeInTheDocument();
  });

  test("calls onFilterChange when input changes", () => {
    const input = screen.getByPlaceholderText("Filter users...");
    fireEvent.change(input, { target: { value: "John" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("John");
  });

  test("calls onSortChange when sort buttons are clicked", () => {
    const sortByNameButton = screen.getByText((_, element) => {
      return element?.textContent === "Sort by Name ▲";
    });
    fireEvent.click(sortByNameButton);
    expect(mockOnSortChange).toHaveBeenCalledWith("name");
  });
});
