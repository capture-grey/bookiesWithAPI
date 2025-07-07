import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ForumPage from "./pages/ForumPage";
import { Navbar } from "./components/common/Navbar";
import Cavbar from "./components/common/Cavbar";

export const SessionDataContext = createContext();

export default function App() {
  const [userID] = useState("u000");
  const [pinnedForums, setPinnedForums] = useState(["forum001", "forum003"]);
  const [sessionData, setSessionData] = useState(null);
  const [hiddenByUserList, setHiddenByUserList] = useState([3, 0]); // for user's personal list
  const [recentForums, setRecentForums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/c/70a5-ddfe-435d-8e3e"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const dataWithHidden = {
          ...data,
          forums: data.forums.map((forum) => ({
            ...forum,
            adminHidden: [], // for admin-hidden content
            userHidden: [], // for user-hidden content
          })),
        };
        setSessionData(dataWithHidden);
      } catch (err) {
        console.error("API fetch failed:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <SessionDataContext.Provider
        value={{
          userID,
          sessionData,
          setSessionData,
          pinnedForums,
          setPinnedForums,
          hiddenByUserList,
          setHiddenByUserList,
          recentForums,
          setRecentForums,
        }}
      >
        <Cavbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="app-container">
                <HomePage />
              </div>
            }
          />
          <Route
            path="/forums/:forumId"
            element={
              <div className="app-container">
                <ForumPage />
              </div>
            }
          />
        </Routes>
      </SessionDataContext.Provider>
    </Router>
  );
}
