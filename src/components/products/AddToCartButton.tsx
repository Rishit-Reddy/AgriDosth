// src/components/AddToCartButton.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cart/cartSlice';

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering the product navigation
    // Dispatch add to cart action
    dispatch(addItemToCart({ productId, quantity: 1, price: 0 }));
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <>
      <button 
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add to Cart
      </button>
      {showMessage && <p className="text-green-500 mt-2">Added to cart</p>}
    </>
  );
};

export default AddToCartButton;
