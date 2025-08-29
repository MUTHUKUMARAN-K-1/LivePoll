import React, { useEffect } from "react";
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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Polls from "./pages/Polls";
import useUserStore from "./store/useStore";
import { checkUserService } from "./services/checkUserService";
import StudentView from "./pages/StudentView";
import TeacherAnalytics from "./pages/TeacherAnalytics";

function App() {
  const queryClient = new QueryClient();
  const { setUser } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkUserService();
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.log("User not authenticated");
      }
    };
    checkAuth();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/student/:pollId" element={<StudentView />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<TeacherAnalytics />} />
            <Route path="/bookmarks" element={<Bookmark />} />
            <Route path="/poll/:pollId" element={<VotingPage />} />
            <Route path="/create" element={<CreatePollForm />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;