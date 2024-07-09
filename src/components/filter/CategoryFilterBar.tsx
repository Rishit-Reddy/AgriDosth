import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase'; // Ensure you have the right path to your Firebase config
import { collection, getDocs } from 'firebase/firestore';
import "../../assets/css/CategoryFilterBar.css";
import { useTranslation } from 'react-i18next';
import translateText from '../../utilites/googleTranslation';

import allIcon from "../../assets/All.jpeg";
import pesticidesIcon from "../../assets/pesticides.png";
import seedsIcon from "../../assets/seeds.png";
import fertilizerIcon from "../../assets/fertiliser.png";
import organicIcon from "../../assets/organic.png";
import bioIcon from "../../assets/bio.png";

const CategoryFilterBar = ({ selectedCategory, setSelectedCategory, subCategory, setSubCategory }: { selectedCategory: string, setSelectedCategory: (category: string) => void, subCategory: string, setSubCategory: (subCategory: string) => void }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [translatedCategories, setTranslatedCategories] = useState<{ [key: string]: string }>({});
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const { i18n } = useTranslation();
  const translationLanguage = i18n.language;

  const categoryIcons: { [key: string]: string } = {
    "All": allIcon,
    "Seed": seedsIcon,
    "Pesticides": pesticidesIcon,
    "Fertilisers": fertilizerIcon,
    "Organic": organicIcon,
    "Bio": bioIcon,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const categorySet = new Set<string>();
        const translations: { [key: string]: string } = {};

        const translationsPromises = querySnapshot.docs.map(async (doc) => {
          const category = doc.data().category;
          if (category) {
            categorySet.add(category);
            if (translationLanguage !== 'en') {
              translations[category] = await translateText(category, translationLanguage);
            } else {
              translations[category] = category;
            }
          }
        });

        await Promise.all(translationsPromises);

        const translatedAll = translationLanguage !== 'en' ? await translateText("All", translationLanguage) : "All";
        const categoryList = ["All", ...Array.from(categorySet)];
        setCategories(categoryList);
        translations["All"] = translatedAll;

        const translatedCategoryList = await Promise.all(categoryList.map(async (category) => {
          if (translationLanguage !== 'en' && category !== "All") {
            return await translateText(category, translationLanguage);
          }
          return category;
        }));

        const translatedCategoryObject = categoryList.reduce((acc, category, index) => {
          acc[category] = translatedCategoryList[index];
          return acc;
        }, {} as { [key: string]: string });

        translatedCategoryObject["All"] = translatedAll;
        setTranslatedCategories(translatedCategoryObject);
        console.log(translations, categoryList, translatedCategoryObject);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, [translationLanguage]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const subCategorySet = new Set<string>();

        querySnapshot.docs.forEach(doc => {
          if (doc.data().category === selectedCategory) {
            const subCategory = selectedCategory === 'Seed' ? doc.data().type : doc.data().brand;
            if (subCategory) {
              subCategorySet.add(subCategory);
            }
          }
        });

        const subCategoryList = ["All", ...Array.from(subCategorySet)];
        setSubCategories(subCategoryList);
      } catch (error) {
        console.error("Error fetching subcategories: ", error);
      }
    };

    if (selectedCategory !== 'All') {
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const getCategoryIcon = (category: string) => {
    const originalCategory = Object.keys(translatedCategories).find(key => translatedCategories[key] === category) || category;
    return categoryIcons[originalCategory] || allIcon;
  };

  return (
    <div className="bg-white shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center overflow-x-auto hide-scroll-bar space-x-4 flex-nowrap">
          {categories.map((category) => (
            <button
              key={category}
              style={{ minWidth: "70px" }}
              onClick={() => {
                setSelectedCategory(category);
                setSubCategory('All');
              }}
              className={`flex flex-col items-center text-gray-700 text-base font-medium focus:outline-none focus:text-gray-900 hover:bg-gray-100 px-2 py-1 whitespace-nowrap ${selectedCategory === category ? "bg-gray-200" : ""}`}
            >
              <img src={getCategoryIcon(category)} alt={category} className="h-12 w-100 rounded-full mb-1" />
              <span>{translatedCategories[category]}</span>
            </button>
          ))}
        </div>
      </div>
      {selectedCategory !== 'All' && (
        <div className="bg-gray-100 py-2 mt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center overflow-x-auto hide-scroll-bar space-x-4 flex-nowrap">
              {subCategories.map((subCategoryItem) => (
                <button
                  key={subCategoryItem}
                  onClick={() => setSubCategory(subCategoryItem)}
                  className={`text-gray-700 text-base font-medium focus:outline-none focus:text-gray-900 hover:bg-gray-100 px-2 py-1 whitespace-nowrap ${subCategory === subCategoryItem ? "bg-gray-300" : ""}`}
                >
                  {subCategoryItem}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterBar;
