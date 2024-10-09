import { render, screen } from "@testing-library/react";
import UserList from "../UserList";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { mockUsers } from "@/mockData/users";

vi.mock("@tanstack/react-query", () => ({
  useSuspenseQuery: vi.fn(() => {
    return { data: mockUsers };
  }),
}));

describe("UserList Component", () => {
  test("renders user information", async () => {
    renderUserList();

    // Check if the mocked user data is rendered correctly
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/john@doe.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/Mary Sue/i)).toBeInTheDocument();
    expect(await screen.findByText(/mary@sue.com/i)).toBeInTheDocument();
  });
});

// Helper function to render UserList with QueryClientProvider
const renderUserList = () => {
  return render(
    <UserList
      filterText={""}
      sortField={"name"}
      sortOrder={"asc"}
      filterField={"id"}
    />
  );
};
