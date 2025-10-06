import Sidebar from "../components/common/Sidebar"
import { useState, useEffect } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5'
import defaultavatar from './../assets/default.png'
import { Outlet } from 'react-router-dom';
import ToggleButton from "../components/ToggleButton";
import { FaBars, FaTimes } from 'react-icons/fa';

export default function AuthenticatedLayout() {
    const base_url = import.meta.env.VITE_APP_BASE_URL;
    const user = JSON.parse(localStorage.getItem('user'));
    const avatar = user?.photo || defaultavatar;
    const [darkMode, setDarkMode] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Determine initial theme
        const initialDarkMode = savedTheme
            ? savedTheme === 'dark'
            : systemPrefersDark;

        setDarkMode(initialDarkMode);

        // Apply the class to HTML element
        if (initialDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Check if mobile on initial render
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const checkIfMobile = () => {
        // Mobile detection logic can be added here if needed
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        // Update localStorage
        if (newDarkMode) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Sidebar */}
            <div className="fixed md:h-screen md:top-0 bottom-0 left-0 w-full md:w-56 z-50">
                <Sidebar user={user} isToggle={toggle} setToggle={setToggle} />
            </div>

            {/* main content */}
            <div className={`md:ml-64 min-h-full relative`}>
                <header className={`py-2 px-4 flex items-center justify-between bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700`}>
                    {/* Toggle Button (Mobile Only) */}
                    <button
                        onClick={() => setToggle((prev) => !prev)}
                        className="text-slate-500 dark:text-slate-400 p-2 rounded-md md:hidden hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {toggle ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                    
                    {/* Header Right Section */}
                    <div className={`flex items-center gap-4 justify-end`}>
                        <div className="my-2 text-center">
                            <ToggleButton initialState={darkMode} text="Dark Mode" onToggle={toggleDarkMode} />
                        </div>
                        <span className="relative block">
                            <IoNotificationsOutline className="h-6 w-6 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer" />
                        </span>
                        <span>
                            <img 
                                src={`${base_url}/${avatar}`} 
                                alt="profile photo" 
                                className={`bg-slate-300 dark:bg-slate-600 h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-600`} 
                            />
                        </span>
                    </div>
                </header>
                <main className={`bg-gray-50 dark:bg-slate-900 min-h-screen py-3 md:py-4 px-4 text-slate-800 dark:text-slate-300 relative`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}