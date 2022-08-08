import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
