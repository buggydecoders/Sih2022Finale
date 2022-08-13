import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import SavedItems from "./pages/SavedItems";
import Status from "./pages/Status";
import Signup from "./pages/Signup";
import Resources from "./pages/Resources";
import Resource from "./pages/Resource";
import EditProfile from "./pages/EditProfile";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/editprofile" element={<EditProfile />}></Route>
        <Route exact path="/status" element={<Status />}></Route>
        <Route exact path="/saved-items" element={<SavedItems />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/resources" element={<Resources />}></Route>
        <Route exact path="/resource" element={<Resource />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
