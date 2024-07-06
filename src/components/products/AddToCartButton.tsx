// src/components/AddToCartButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cart/cartSlice';

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering the product navigation
    // Dispatch add to cart action
    dispatch(addItemToCart({ productId, quantity: 1 }));
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
