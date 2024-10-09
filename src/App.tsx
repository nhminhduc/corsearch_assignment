import { useState, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FilterSort from "./components/FilterSort";
import UserList from "./components/UserList";
import CustomErrorBoundary from "./components/ErrorBoundary";
import { User } from "@/types";

const queryClient = new QueryClient();

function App() {
  const [filterText, setFilterText] = useState("");
  const [filterField, setFilterField] = useState<keyof User>("name");
  const [sortField, setSortField] = useState<"name" | "email">();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  const handleFilterChange = (text: string) => {
    setFilterText(text);
  };

  const handleFilterFieldChange = (field: keyof User) => {
    setFilterField(field);
  };

  const handleSortChange = (field: "name" | "email") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setIsSortEnabled(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">User Dashboard</h1>
        <FilterSort
          filterText={filterText}
          onFilterChange={handleFilterChange}
          filterField={filterField}
          onFilterFieldChange={handleFilterFieldChange}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <CustomErrorBoundary>
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <UserList
              filterText={filterText}
              filterField={filterField}
              sortField={isSortEnabled ? sortField : undefined}
              sortOrder={isSortEnabled ? sortOrder : undefined}
            />
          </Suspense>
        </CustomErrorBoundary>
      </div>
    </QueryClientProvider>
  );
}
export default App;
