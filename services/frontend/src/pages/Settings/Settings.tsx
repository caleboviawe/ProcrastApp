import React from 'react';
import  './Settings.css'
import profileIcon from '../../assets/profile-icon.png'
import { useNavigate } from 'react-router-dom';
import clockIcon from '../../assets/clock-icon.png'
import logoutIcon from '../../assets/log-out.png'
import backIcon from '../../assets/back-arrow.png'

const Settings: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='settings-container'>
      <div className='top-bar'>
        <div className='left-side'>
          <img src={clockIcon} alt="Clock Icon" className='clock-icon' />
          <h2 className='app-name'>ProcrastApp</h2>
        </div>

        <div className='right-side'>
          <button className='back-btn' onClick={() => navigate(-1)}>
            <img src={backIcon} alt="Back" />
            Back
          </button>
          
          <button className='logout-btn'>
            <img src={logoutIcon} alt="Log Out" />
            Log Out
          </button>
        </div>
      </div>
      <div className='settings-header'>
        <img src={profileIcon} alt="Profile Icon" className='profile-icon'/>
        <h1>Your Profile</h1>
      </div>
    <div className='settings-box'>

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
  </div>
  );
};

export default Settings;