import Sidebar from "../components/common/Sidebar"
import { useState, useEffect } from 'react';
import {IoNotificationsOutline} from 'react-icons/io5'
import defaultavatar from './../assets/default.png'
import { Outlet } from 'react-router-dom';
import ToggleButton from "../components/ToggleButton";
import { FaBars, FaTimes } from 'react-icons/fa';
export default function AuthenticatedLayout() {
    const base_url = import.meta.env.VITE_APP_BASE_URL;
    const user = JSON.parse(localStorage.getItem('user'));
    const avatar = user?.photo || defaultavatar;
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
        
    }, [])
   
    const changeThemeMode = (darkmode) => {
      
        if (darkmode == true) {
            localStorage.setItem('theme', 'dark')
           console.log('Dark mode is true:');
        } else {
            localStorage.removeItem('theme')
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark')
            setDarkMode(false);
        }
    }

  
    
    return (
        <div className="min-h-screen "> 
            {/* Sidebar */}
            <div className="fixed md:h-screen md:top-0 bottom-0 left-0 w-full md:w-56  z-50">
                <Sidebar user={user} isToggle={toggle} setToggle={setToggle}/>
            </div>


            {/* main content */}
            <div className={`md:ml-64 min-h-full relative`}>
                <header className={`py-2  px-4 flex items-center justify-between`}>
                     {/* Toggle Button (Mobile Only) */}
                     <button
                            onClick={() => setToggle((prev) => !prev)}
                            className="text-slate-500 p-2 rounded-md md:hidden"
                        >
                            {toggle ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    <div className={`flex items-center gap-4 justify-end`}>
                       
                        <div className="my-2 text-center">
                            <ToggleButton initialState={darkMode} text="Dark Mode" onToggle={(state) => changeThemeMode(state)} />
                        </div>
                        <span className="relative block">
                            <IoNotificationsOutline className="h-6 w-6" />
                        </span>
                        <span>
                            {/* <img src={(user?.photo && user?.photo != 'default.png') ? user?.photo : defaulAvatar} alt=" " className={`bg-slate-300 h-10 w-10 rounded-full overflow-hidden`} /> */}
                            <img src={`${base_url}/${avatar}`} alt="profile photo" className={`bg-slate-300 h-10 w-10 rounded-full overflow-hidden`} />
                        </span>
                    </div>
                </header>
                <main className={`bg-gray-50 min-h-screen py-3 md:py-4 px-4 text-slate-800 dark:text-slate-300 relative`}>
                   <Outlet />
                </main>
            </div>
        </div>
    );
}
