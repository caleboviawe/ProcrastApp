import React from 'react';
import  './Settings.css'
import proileIcon from '../../assets/profile-icon.png'

const Settings: React.FC = () => {
  return (
    <div className='settings-container'>
      <div className='title-container'>
        <img src={proileIcon} alt="Profile Icon" className='profile-icon'/>
        <h1 className='your-profile'>Your Profile</h1>
      </div>
    <div className='settings-box'>
      <div className='profile-fields'>
        <p>USERNAME:</p>
        <p>PASSWORD:</p>
        <p>EMAIL:</p>
        <p>BIRTHDAY:</p>
        <p>DATE CREATED:</p>
      </div>
    </div>
  </div>
  );
};

export default Settings;