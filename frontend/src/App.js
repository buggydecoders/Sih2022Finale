import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import SavedItems from "./pages/SavedItems";
import Status from "./pages/Status";
import Signup from "./pages/Signup";
import Requests from "./pages/Requests";
import Inbox from "./pages/Inbox";
import SendRequest from "./pages/SendRequest";
import RecievedRequest from "./pages/RecievedRequest";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/status" element={<Status />}></Route>
        <Route exact path="/saved-items" element={<SavedItems />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/requests" element={<Requests />}></Route>
        <Route exact path="/inbox" element={<Inbox />}></Route>
        <Route exact path="/send-request" element={<SendRequest />}></Route>
        <Route exact path="/recieved-request" element={<RecievedRequest />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
