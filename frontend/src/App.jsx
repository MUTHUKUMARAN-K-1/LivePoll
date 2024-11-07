import {} from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bookmark from "./pages/Bookmark";
import VotingPage from "./pages/VotingPage";
import CreatePollForm from "./pages/CreatePollForm";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookmark" element={<Bookmark />} />
        <Route path="/voting/:pollId" element={<VotingPage />} />
        <Route path="/create" element={<CreatePollForm />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
