import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase'; // Ensure you have the right path to your Firebase config
import { collection, getDocs } from 'firebase/firestore';
import "../../assets/css/CategoryFilterBar.css"

const CategoryFilterBar = ({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: (category: string) => void }) => {
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const categorySet = new Set();
      
        querySnapshot.docs.forEach(doc => {
          const category = doc.data().category;
          if (category) {
            categorySet.add(category);
          }
        })
      
        const categoryList: any = ["All", ...Array.from(categorySet)];
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center overflow-x-auto hide-scroll-bar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-gray-700 text-base font-medium focus:outline-none focus:text-gray-900 hover:bg-gray-100 px-2 py-1 whitespace-nowrap ${selectedCategory === category ? "bg-gray-200" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;
