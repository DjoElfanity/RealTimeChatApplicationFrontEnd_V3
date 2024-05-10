import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./Components/Authentification/RequireAuth";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/chat"
            element={
              <RequireAuth >
                <Home />
              </RequireAuth>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
