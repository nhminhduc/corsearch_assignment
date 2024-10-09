import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/userStore";
import { User } from "@/types";
import useDebounce from "@/hooks/useDebounce";

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Network error occurred while fetching users");
  }
};

type UserListProps = {
  filterText: string;
  filterField: keyof User;
  sortField?: "name" | "email";
  sortOrder?: "asc" | "desc";
};

const UserList = ({
  filterText,
  filterField,
  sortField,
  sortOrder,
}: UserListProps) => {
  const debouncedFilterText = useDebounce(filterText, 300);
  const { setUsers, filteredUsers, applyFilterAndSort } = useUserStore();

  const { data: users, error } = useSuspenseQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users, setUsers]);

  useEffect(() => {
    applyFilterAndSort(debouncedFilterText, filterField, sortField, sortOrder);
  }, [
    debouncedFilterText,
    filterField,
    sortField,
    sortOrder,
    applyFilterAndSort,
  ]);

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load users. Please try again later.
      </div>
    );
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const renderUserField = (fieldValue: string, fieldName: keyof User) => {
    return filterField === fieldName
      ? highlightText(fieldValue, filterText)
      : fieldValue;
  };

  if (filteredUsers.length === 0) {
    return <div className="text-gray-500">No users found.</div>;
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      data-testid="user-list"
    >
      {filteredUsers?.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-md p-6"
          data-testid="user-list-item"
        >
          <h2 className="text-xl font-semibold mb-2" data-testid="user-name">
            {renderUserField(user.name, "name")}
          </h2>
          <p className="mb-1" data-testid="user-email">
            <span className="font-medium">Email:</span>{" "}
            {renderUserField(user.email, "email")}
          </p>
          <p className="mb-1">
            <span className="font-medium">Phone:</span>{" "}
            {renderUserField(user.phone, "phone")}
          </p>
          <p className="mb-1">
            <span className="font-medium">Website:</span>{" "}
            {renderUserField(user.website, "website")}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {renderUserField(
              `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
              "address"
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
