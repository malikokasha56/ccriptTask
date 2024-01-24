import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="Login" element={<Login />} />
            <Route
              path="HomePage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotfoumd />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

function PageNotfoumd() {
  return <div>Page not found </div>;
}
