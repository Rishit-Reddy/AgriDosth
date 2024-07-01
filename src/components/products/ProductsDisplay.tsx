import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase'; // Firebase config import
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProductsDisplay = ({ selectedCategory }: { selectedCategory: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      const productsCollection = collection(db, "products");
      const q = selectedCategory === "All"
        ? productsCollection
        : query(productsCollection, where("category", "==", selectedCategory));

      const querySnapshot = await getDocs(q);
      const productList: any = querySnapshot.docs.map(doc => doc.data());
      setProducts(productList);
      setLoading(false); // End loading
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) {
    return <div className="p-4 text-center text-gray-700 text-lg">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out">
          <div className="block sm:hidden grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover"/>
            </div>
            <div className="col-span-1 p-2">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
              <p className="text-gray-800 font-semibold">Brand: {product.brand}</p>
              <p className="text-gray-800 font-semibold">Price: ₹{product.price}</p>
              <p className="text-gray-800 font-semibold">Quantity: {product.quantity}</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="h-44 flex justify-center w-full">
              <img src={product.image} alt={product.name} className="h-full object-cover"/>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
              <p className="text-gray-800 font-semibold">Brand: {product.brand}</p>
              <p className="text-gray-800 font-semibold">Price: ₹{product.price}</p>
              <p className="text-gray-800 font-semibold">Quantity: {product.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsDisplay;
