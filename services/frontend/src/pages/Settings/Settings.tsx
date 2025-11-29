import React, { useState } from 'react';
import  './Settings.css'
import { useNavigate } from 'react-router-dom';
import { User, Clock, LogOut, ArrowLeft, Sun, Moon } from 'lucide-react';

// adding dark mode toggle for now --> will implement later

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  }

  return (
    <div className='settings-container'>
      <div className='top-bar'>
        <div className='left-side'>
          <Clock className='clock-icon' />
          <h2 className='app-name'>ProcrastApp</h2>
        </div>

        <div className='main-page-title'>Settings</div>

        <div className='right-side'>
          <button className='back-btn' onClick={() => navigate(-1)}>
            <ArrowLeft className='back-icon'/>
            Back
          </button>
          
          <button className='logout-btn'>
            <LogOut className='logout-icon'/>
            Log Out
          </button>
        </div>
      </div>

    <div className='settings-options'>
      <div className='settings-box'>
        <div className='settings-header'>
          <User className='profile-icon'/>
          <h4>Your Profile</h4>
        </div>
        <p className='description'>Manage your personal information and preferences.</p>
        <div className='settings-rows'>
          <label>USERNAME:</label>
          <input type="text" readOnly/>
          <button onClick={() => navigate('/change-username')}>Edit</button>
        </div>

        <div className='settings-rows'>
          <label>PASSWORD:</label>
          <input type="text" readOnly/>
          <button onClick={() => navigate('/change-password')}>Edit</button>
        </div>

        <div className='settings-rows'>
          <label>EMAIL:</label>
          <input type="text" readOnly/>
          <button onClick={() => navigate('/change-email')}>Edit</button>
        </div>

        <div className='settings-rows'>
          <label>BIRTHDAY:</label>
          <input type="text" readOnly/>
          <button onClick={() => navigate('/change-birthday')}>Edit</button>
        </div>

        <div className='settings-rows'>
          <label>DATE CREATED:</label>
          <input type="text" readOnly/>
        </div>
        </div>

        <div className='appearance-box'>
        <h4>Appearance</h4>
        <p className='description'>
          Customize the look and feel of the application.
        </p>
        <div className='settings-row'>
          <label>Theme:</label>
          <button className='toggle-btn' onClick={toggleDarkMode}>
            {darkMode ? <Sun /> : <Moon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
      </div>
    </div>
    </div>
    

    

  </div>
  );
};

export default SettingsPage;