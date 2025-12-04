import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
    //const [darkMode, setDarkMode] = useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button onClick={() => setDarkMode(!darkMode)} className='bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 rounded-lg transition-all flex items-center justify-center cursor-pointer'>
            {darkMode ? <Sun className='w-5'/> : <Moon className='w-5'/>}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}