import { User } from "@/types";
import { create } from "zustand";

type UserStore = {
  users: User[];
  filteredUsers: User[];
  filterText: string;
  filterField: keyof User;
  sortField?: "name" | "email";
  sortOrder?: "asc" | "desc";
  setUsers: (users: User[]) => void;
  applyFilterAndSort: (
    filterText?: string,
    filterField?: keyof User,
    sortField?: "name" | "email",
    sortOrder?: "asc" | "desc"
  ) => void;
};

const filterAndSortUsers = (
  users: User[],
  filterText: string,
  filterField: keyof User,
  sortField?: "name" | "email",
  sortOrder?: "asc" | "desc"
) => {
  // Filter the users based on the filterText and filterField
  const filtered = users.filter((user) =>
    String(user[filterField]).toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort the filtered users based on sortField and sortOrder, if provided
  if (sortField) {
    return filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  return filtered;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  filteredUsers: [],
  filterText: "",
  filterField: "name",
  sortField: undefined,
  sortOrder: undefined,

  setUsers: (users: User[]) => {
    set({ users });
  },

  applyFilterAndSort: (
    filterText = "",
    filterField = "name",
    sortField,
    sortOrder
  ) => {
    set((state) => ({
      filterText,
      filterField,
      sortField,
      sortOrder,
      filteredUsers: filterAndSortUsers(
        state.users,
        filterText,
        filterField,
        sortField,
        sortOrder
      ),
    }));
  },
}));
