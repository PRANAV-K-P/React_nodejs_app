import './App.css'
import Nav from "./Components/Nav";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from './Components/Footer';
import SignUp from './Components/signup/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/login/Login'
import Profile from './Components/profile/Profile';
import AddProduct from './Components/addProduct/AddProduct';
import Home from './Components/Home/Home';
import ProductList from './Components/ProductList/ProductList';
import UpdateProduct from './Components/updateProduct/UpdateProduct';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route element={<PrivateComponent />}>
      <Route path="/" element={<Home/>} />
      <Route path="/productlist" element={<ProductList/>} />
      <Route path="/add" element={<AddProduct/> } />
      <Route path="/update/:id" element={<UpdateProduct/>} />
      <Route path="/logout" element={<h1>Logout component</h1> } />
      <Route path="/profile" element={<Profile /> } />
      
      </Route>
      <Route path="/login" element={<Login/> } />
      <Route path="/signup" element={<SignUp/> } />
      
    </Routes>
    </BrowserRouter>
    <Footer />
  </div>

  );
}

export default App;
