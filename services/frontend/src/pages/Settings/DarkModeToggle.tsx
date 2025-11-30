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
        <button onClick={() => setDarkMode(!darkMode)} className='toggle-btn'>
            {darkMode ? <Sun className='theme-icon'/> : <Moon className='theme-icon'/>}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}