import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
