import { User } from "@/types";

type FilterSortProps = {
  filterText: string;
  onFilterChange: (text: string) => void;
  filterField: keyof User;
  onFilterFieldChange: (field: keyof User) => void;
  sortField?: "name" | "email";
  sortOrder?: "asc" | "desc";
  onSortChange: (field: "name" | "email") => void;
};

const FilterSort = ({
  filterText,
  onFilterChange,
  filterField,
  onFilterFieldChange,
  sortField,
  sortOrder,
  onSortChange,
}: FilterSortProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <div className="flex flex-col md:flex-row items-center space-x-4 mb-4 md:mb-0">
        <select
          value={filterField}
          onChange={(e) => onFilterFieldChange(e.target.value as keyof User)}
          className="px-4 py-2 rounded-md border border-gray-300"
          data-testid="filter-field-select"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="phone">Phone</option>
          <option value="website">Website</option>
          <option value="address">Address</option>
          <option value="company">Company</option>
        </select>
        <input
          type="text"
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Filter users..."
          className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300"
          data-testid="user-filter-input"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onSortChange("name")}
          className={`px-4 py-2 rounded-md ${
            sortField === "name"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          data-testid="sort-by-name"
        >
          Sort by Name{" "}
          {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
        </button>
        <button
          onClick={() => onSortChange("email")}
          className={`px-4 py-2 rounded-md ${
            sortField === "email"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          data-testid="sort-by-email"
        >
          Sort by Email{" "}
          {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
        </button>
      </div>
    </div>
  );
};

export default FilterSort;
