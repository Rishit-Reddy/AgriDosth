// src/components/ProfileUpdate.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../redux/store';
import { updateProfile } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const ProfileUpdate: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: '',
        phoneNumber: '',
        address: {
            Address: '',
            city: '',
            state: '',
            Pincode: '',
            country: 'India'  // default value if preferred
        },
        email: user?.email || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in profile.address) {
            setProfile({
                ...profile,
                address: {
                    ...profile.address,
                    [name]: value
                }
            });
        } else {
            setProfile({
                ...profile,
                [name]: value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            dispatch(updateProfile({ uid: user.uid, profile: { ...profile, isProfileComplete: true } }));
        }
        navigate('/');
    };

    return (
        <>
        <Navbar/>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('pages.profile.name')}</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">{t('pages.profile.phoneNumber')}</label>
        <input
          type="text"
          name="phoneNumber"
          value={profile.phoneNumber}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="Address" className="block text-sm font-medium text-gray-700">{t('pages.profile.address.Address')}</label>
        <input
          type="text"
          name="Address"
          value={profile.address.Address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">{t('pages.profile.address.city')}</label>
        <input
          type="text"
          name="city"
          value={profile.address.city}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">{t('pages.profile.address.state')}</label>
        <input
          type="text"
          name="state"
          value={profile.address.state}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="Pincode" className="block text-sm font-medium text-gray-700">{t('pages.profile.address.Pincode')}</label>
        <input
          type="text"
          name="Pincode"
          value={profile.address.Pincode}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">{t('pages.profile.address.country')}</label>
        <input
          type="text"
          name="country"
          value={profile.address.country}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('pages.profile.email')}</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
        />
      </div>
      <div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {t('pages.profile.update')}
        </button>
      </div>
    </form>
    </>
    );
};

export default ProfileUpdate;
