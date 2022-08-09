import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SavedItems from "./pages/SavedItems";
import Status from "./pages/Status";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/status" element={<Status />}></Route>
        <Route exact path="/saved-items" element={<SavedItems />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
