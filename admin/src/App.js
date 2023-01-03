import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./Components/AdminHome/AdminHome";
import AdminLogin from "./Components/Adminlogin/AdminLogin";
import AdminNav from "./Components/AdminNav/AdminNav";
import PrivateComponent from "./Components/PrivateComponent";
import ListUsers from "./Components/ViewUsers/ListUsers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AdminNav />
        <Routes>
          <Route>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<AdminHome />} />
              <Route path="/users" element={<ListUsers/>} />
            </Route>
            <Route path="/admin" element={<AdminLogin/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
