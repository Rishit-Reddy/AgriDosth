import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase'; // Ensure you have the right path to your Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

const ProductsDisplay = ({ selectedCategory, subCategory }: { selectedCategory: string, subCategory: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      let q;
      const productsCollection = collection(db, "products");

      if (selectedCategory === "All") {
        q = productsCollection;
      } else {
        if (subCategory === "All") {
          q = query(productsCollection, where("category", "==", selectedCategory));
        } else {
          if (selectedCategory === 'Seed') {
            q = query(productsCollection, where("category", "==", selectedCategory), where("type", "==", subCategory));
          } else {
            q = query(productsCollection, where("category", "==", selectedCategory), where("brand", "==", subCategory));
          }
        }
      }

      const querySnapshot = await getDocs(q);
      const productList: any = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productList);
      setLoading(false); // End loading
    };

    fetchProducts();
  }, [selectedCategory, subCategory]);

  if (loading) {
    return <div className="p-4 text-center text-gray-700 text-lg">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product, index) => (
        <div 
          key={index} 
          className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)} // Navigate to product page on click
        >
          <div className="block sm:hidden grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-200"/>
            </div>
            <div className="col-span-1 p-4">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
              <p className="text-gray-800 font-semibold">Brand: {product.brand}</p>
              <p className="text-gray-800 font-semibold">Price: ₹{product.price}</p>
              <p className="text-gray-800 font-semibold">Quantity: {product.quantity}</p>
              <AddToCartButton productId={product.id} /> 
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="h-56 flex justify-center w-full overflow-hidden">
              <img src={product.image} alt={product.name} className="h-full object-cover hover:scale-105 transition-transform duration-200"/>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
              <p className="text-gray-800 font-semibold">Brand: {product.brand}</p>
              <p className="text-gray-800 font-semibold">Price: ₹{product.price}</p>
              <p className="text-gray-800 font-semibold">Quantity: {product.quantity}</p>
            </div>
            <div className="p-4">
              <AddToCartButton productId={product.id} /> {/* Add button in desktop view */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsDisplay;
