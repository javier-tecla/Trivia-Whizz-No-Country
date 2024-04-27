import { Link, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useLocalStorage } from "../public/hooks/useLocalStorage";
import LogoutIcon from "./components/icons/logout";
import { ProtectedRoute } from "./components/protected-route";
import { SkipIfAuth } from "./components/skip-if-auth";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Questions from "./pages/questions";
import Ranking from "./pages/ranking";
import Register from "./pages/register";
import { useAuthStore } from "./stores/auth.store";

function App() {
  const [storedUser, setStoredUser] = useLocalStorage("user", null);

  const { user, login, logout } = useAuthStore();

  useEffect(() => {
    if (!user && storedUser) {
      login(storedUser);
    }
  }, [storedUser, user, login]);

  const handleLogout = () => {
    logout();
    setStoredUser(null);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen ">
      <div className="container flex justify-between py-8 mx-auto">
        <Link to={"/"}>
        <div className="hidden md:block">
          <img
            src="/isologobco.png"
            alt="Trivia Whizz Logo"
            className="absolute top-0 left-0 m-8 hover:scale-110 transition-all duration-500"
            style={{
              width: "250px",
              filter: "drop-shadow(0 0 5px rgba(242, 240, 246, 0.8))",
            }}
          />
          </div>
        </Link>

        {user && (
          <div className="flex items-center gap-4 text-white ">
            <h1 className="text-3xl irish-grover-regular">{user?.nick}</h1>

            <div
              className="flex text-yellow-500 cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon className="text-3xl m-3" />
            </div>
          </div>
        )}
      </div>

      <main className="flex items-center justify-center flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <SkipIfAuth>
                <Register />
              </SkipIfAuth>
            }
          />
          <Route
            path="/login"
            element={
              <SkipIfAuth>
                <Login />
              </SkipIfAuth>
            }
          />
        </Routes>
      </main>
    </div>
    // <div className="flex items-center justify-center h-screen">
    //   <div className="justify-between hidden border-2 md:flex">
    //
    //   </div>

    // </div>
  );
}

export default App;
