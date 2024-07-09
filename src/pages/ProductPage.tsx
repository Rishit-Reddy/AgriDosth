import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar/Navbar';
import MobileSearchBar from '../components/Navbar/MobileSearchbar';
import AddToCartButton from '../components/products/AddToCartButton';
import translateText from '../utilites/googleTranslation'; 
import { useTranslation } from 'react-i18next';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const translationLanguage = i18n.language;

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productDoc = doc(db, 'products', id);
        const productSnap = await getDoc(productDoc);

        if (productSnap.exists()) {
          const productData = productSnap.data();

          let translatedName = productData ? productData.name : '';
          let translatedDescription = productData ? productData.description : '';
          let translatedBrand = productData ? productData.brand : '';

          if (translationLanguage !== 'en') {
            if (productData) {
              translatedName = await translateText(productData.name, translationLanguage);
              translatedDescription = await translateText(productData.description, translationLanguage);
              translatedBrand = await translateText(productData.brand, translationLanguage);
            }
          }

          setProduct({ ...productData, name: translatedName, description: translatedDescription, brand: translatedBrand });
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, translationLanguage]);

  if (loading) {
    return <div className="p-4 text-center text-gray-700 text-lg">Loading...</div>;
  }

  if (!product) {
    return <div className="p-4 text-center text-gray-700 text-lg">Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <MobileSearchBar />
      <div className="max-w-7xl mx-auto p-4">
        <nav className="text-gray-600 text-sm mb-4">
          <ol className="list-reset flex">
            <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li>{product.name}</li>
          </ol>
        </nav>
        <div className="bg-white overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-4">
              <div className="w-full h-96 flex items-center justify-center rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full object-contain" />
              </div>
            </div>
            <div className="lg:w-1/2 p-4">
              <h2 className="font-bold text-3xl mb-4">{product.name}</h2>
              <p className="text-gray-600 text-lg mb-4">{product.description}</p>
              <p className="text-gray-800 text-xl font-semibold mb-2">Brand: {product.brand}</p>
              <p className="text-gray-800 text-xl font-semibold mb-2">Price: ₹{product.price}</p>
              <p className="text-gray-800 text-xl font-semibold mb-4">Quantity: {product.quantity}</p>
              <AddToCartButton productId={id ?? ''} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
