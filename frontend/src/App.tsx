import './App.css';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminProjectsPage';
import CartPage from './pages/CartPage';
import AddtoCart from './pages/AddToCartPage';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/addtocart/:title/:bookId/:price"
              element={<AddtoCart />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminprojects" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
