import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateQuantity, removeItemFromCart } from '../redux/cart/cartSlice';
import Navbar from '../components/Navbar/Navbar';
import MobileSearchBar from '../components/Navbar/MobileSearchbar';
import translateText from '../utilites/googleTranslation'; 
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setTotalPrice } from '../redux/cart/TotalPrice';

const CartPage: React.FC = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const [products, setProducts] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state) => state.auth.userProfile);
    const { t, i18n } = useTranslation();
    const translationLanguage = i18n.language;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const productDetails = await Promise.all(
                cartItems.map(async (item) => {
                    const productDoc = await getDoc(doc(db, 'products', item.productId));
                    const productData = productDoc.data();
                    
                    let translatedName = productData ? productData.name : '';
                    let translatedDescription = productData ? productData.description : '';
                    let translatedCategory = productData ? productData.category : '';

                    if (translationLanguage !== 'en') {
                        if (productData) {
                            translatedName = await translateText(productData.name, translationLanguage);
                            translatedDescription = await translateText(productData.description, translationLanguage);
                            translatedCategory = await translateText(productData.category, translationLanguage);
                        }
                    }
                    
                    return { 
                        ...productData, 
                        quantity: item.quantity, 
                        productId: item.productId, 
                        name: translatedName, 
                        description: translatedDescription, 
                        category: translatedCategory 
                    };
                })
            );
            setProducts(productDetails);
        };

        fetchProducts();
    }, [cartItems, translationLanguage]);

    const handleQuantityChange = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleRemove = (productId: string) => {
        dispatch(removeItemFromCart(productId));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    dispatch(setTotalPrice(totalCost));
    
    return (
        <>
            <Navbar />
            <MobileSearchBar />
            <section className="relative z-10 after:content-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">{t('pages.profile.cart.shoppingCart')}</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{totalItems} {t('pages.profile.cart.items')}</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">{t('pages.profile.cart.productDetails')}</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">{t('pages.profile.cart.Quantity')}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">{t('pages.profile.cart.Total')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {products.map((product) => (
                                <div key={product.productId} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
                                    <div className="w-full md:max-w-[126px]">
                                        <img src={product.image} alt={product.name} className="mx-auto w-20 h-20 md:w-40 md:h-40" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                        <div className="md:col-span-2">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                <h6 className="font-semibold text-base leading-7 text-black">{product.name}</h6>
                                                <h6 className="font-normal text-base leading-7 text-gray-500">{product.category}</h6>
                                                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">₹{product.price}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                            <div className="flex items-center h-full">
                                                <button 
                                                    onClick={() => handleQuantityChange(product.productId, product.quantity - 1)} 
                                                    className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                                <input type="text" value={product.quantity} readOnly className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent" />
                                                <button 
                                                    onClick={() => handleQuantityChange(product.productId, product.quantity + 1)} 
                                                    className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">₹{product.price * product.quantity}</p>
                                            <button onClick={() => handleRemove(product.productId)} className="text-red-500 ml-4 flex items-center">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            {t('pages.profile.cart.orderSummary')}
                            </h2>
                            <div className="mt-8">
                                <div className="flex items-center justify-between pb-6">
                                    <p className="font-normal text-lg leading-8 text-black">{totalItems} {t('pages.profile.cart.items')}</p>
                                    <p className="font-medium text-lg leading-8 text-black">₹{totalCost}</p>
                                </div>
                                <form>
                                    <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">{t('pages.profile.address.Address')}</label>
                                    <div className="flex flex-col space-y-4 pb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">{t('pages.profile.address.Address')}</label>
                                            <input
                                                type="text"
                                                className="block w-full h-11 pr-3 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                                                placeholder="Enter your address"
                                                value={userProfile?.address?.Address}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">{t('pages.profile.address.Pincode')}</label>
                                            <input
                                                type="text"
                                                className="block w-full h-11 pr-3 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                                                placeholder="Enter your pincode"
                                                value={userProfile?.address?.Pincode}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">{t('pages.profile.address.city')}</label>
                                            <input
                                                type="text"
                                                className="block w-full h-11 pr-3 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                                                placeholder="Enter your city"
                                                value={userProfile?.address?.city}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">{t('pages.profile.address.state')}</label>
                                            <input
                                                type="text"
                                                className="block w-full h-11 pr-3 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                                                placeholder="Enter your state"
                                                value={userProfile?.address?.state}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-8">
                                        <p className="font-medium text-xl leading-8 text-black">{totalItems} {t('pages.profile.cart.items')}</p>
                                        <p className="font-semibold text-xl leading-8 text-indigo-600">₹{totalCost}</p>
                                    </div>
                                    <button
                                        className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                                        onClick={() => {navigate('/payment')}}
                                    >
                                        {t('pages.profile.cart.checkout')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
