import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function AddtoCart() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart: itemAddtoCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
    };
    itemAddtoCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Do you want to add {title} to your cart</h2>

      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default AddtoCart;
