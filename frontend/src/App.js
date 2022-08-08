import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
