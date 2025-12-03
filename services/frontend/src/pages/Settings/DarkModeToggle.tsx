import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <button onClick={() => setDarkMode(!darkMode)} className='bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 rounded-lg transition-all flex items-center justify-center cursor-pointer'>
            {darkMode ? <Sun className='w-5'/> : <Moon className='w-5'/>}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}