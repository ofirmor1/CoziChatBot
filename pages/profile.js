// pages/profile.js
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const Profile = () => {
    const { user, updateUserProfile, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        router.push('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, photoURL } = e.target.elements;
        try {
            await updateUserProfile(displayName.value, photoURL.value);
            alert('הפרופיל עודכן בהצלחה');
        } catch (error) {
            alert('שגיאה בעדכון הפרופיל');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    הפרופיל שלי
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                שם מלא
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="displayName"
                                    id="displayName"
                                    defaultValue={user.displayName || ''}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                                תמונת פרופיל (URL)
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="photoURL"
                                    id="photoURL"
                                    defaultValue={user.photoURL || ''}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                עדכן פרופיל
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={logout}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            התנתק
                        </button>
                    </div>

                    <div className="mt-6">
                        <Link href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50">
                            חזרה לדף הבית
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;