import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Ensure this path is correct for your project structure
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import translateText from '../../utilites/googleTranslation'; // Make sure this utility works as expected
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks';

const ProductsDisplay = ({ selectedCategory, subCategory }: { selectedCategory: string, subCategory: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const translatationLanguage = i18n.language;
  const navigate = useNavigate();
  const searchQuery = useAppSelector(state => state.search.query);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let q = query(collection(db, "products"));

      const conditions = [];
      if (selectedCategory !== "All") {
        conditions.push(where("category", "==", selectedCategory));
        if (subCategory !== "All") {
          if (selectedCategory === 'Seed') {
            conditions.push(where("type", "==", subCategory));
          } else {
            conditions.push(where("brand", "==", subCategory));
          }
        }
      }

      if (searchQuery) {
        conditions.push(where("name", ">=", searchQuery));
        conditions.push(where("name", "<=", searchQuery + '\uf8ff'));
      }

      if (conditions.length) {
        q = query(collection(db, "products"), ...conditions);
      }

      const querySnapshot = await getDocs(q);
      // Define a type for your product items
      type ProductItem = {
        id: string;
        name: string; // Include other properties as needed
        description: string; // Assuming description is also a property you're fetching
      };
      
      let productList = querySnapshot.docs.map(doc => ({ ...doc.data() as ProductItem, id: doc.id }));

      if (translatationLanguage !== 'en') {
        productList = await Promise.all(productList.map(async product => {
          const translatedName = await translateText(product.name, translatationLanguage);
          const translatedDescription = await translateText(product.description, translatationLanguage);
          return { ...product, name: translatedName, description: translatedDescription };
        }));
      }

      setProducts(productList);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, subCategory, translatationLanguage, searchQuery]);

  if (loading) {
    return <div className="p-4 text-center text-gray-700 text-lg">Loading...</div>;
  }

  if (!products.length) {
    return <div className="p-4 text-center text-gray-700 text-lg">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="block sm:hidden grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-200" />
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
              <img src={product.image} alt={product.name} className="h-full object-cover hover:scale-105 transition-transform duration-200" />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
              <p className="text-gray-800 font-semibold">Brand: {product.brand}</p>
              <p className="text-gray-800 font-semibold">Price: ₹{product.price}</p>
              <p className="text-gray-800 font-semibold">Quantity: {product.quantity}</p>
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsDisplay;
