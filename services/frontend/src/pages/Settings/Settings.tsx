import React from 'react';
import  './Settings.css'
import proileIcon from '../../assets/profile-icon.png'

const Settings: React.FC = () => {
  return (
    <div className='settings-container'>
      <div className='settings-header'>
        <img src={proileIcon} alt="Profile Icon" className='profile-icon'/>
        <h1>Your Profile</h1>
      </div>
    <div className='settings-box'>

      <div className='settings-rows'>
        <label>USERNAME:</label>
        <input type="text" readOnly/>
        <button>Edit</button>
      </div>

      <div className='settings-rows'>
        <label>PASSWORD:</label>
        <input type="text" readOnly/>
        <button>Edit</button>
      </div>

      <div className='settings-rows'>
        <label>EMAIL:</label>
        <input type="text" readOnly/>
        <button>Edit</button>
      </div>

      <div className='settings-rows'>
        <label>BIRTHDAY:</label>
        <input type="text" readOnly/>
        <button>Edit</button>
      </div>

      <div className='settings-rows'>
        <label>DATE CREATED:</label>
        <input type="text" readOnly/>
        <button>Edit</button>
      </div>

    </div>
  </div>
  );
};

export default Settings;