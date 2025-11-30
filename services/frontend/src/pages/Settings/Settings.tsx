import React, { useState } from 'react';
import  './Settings.css'
import { useNavigate } from 'react-router-dom';
import { Bell, Database, Palette, User, Clock, LogOut, ArrowLeft, Sun, Moon } from 'lucide-react';
import  DarkModeToggle  from './DarkModeToggle';

// adding dark mode toggle for now --> will implement later

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='settings-container'>
      <div className='top-bar'>
        <div className='left-side'>
          <Clock className='clock-icon' />
          <h2 className='app-name'>ProcrastApp</h2>
        </div>

        <h4 className='main-page-title'>Settings</h4>

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
        <div className='box-header'>
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

        <div className='data-box'>
          <div className='box-header'>
            <Palette className='profile-icon'/>
            <h4>Appearance</h4>
          </div>
          <p className='description'>Customize the look and feel of your workspace.</p>
          <div className='settings-row'>
            <button className='toggle-btn'>
              <DarkModeToggle />
            </button>
          </div>
        </div>

        <div className='data-box'>
          <div className='box-header'>
            <Database className='profile-icon'/>
            <h4>Data Management</h4>
          </div>
          <p className='description'>Manage your data and privacy settings.</p>
          <div className='settings-row'>
            <button className='data-btn'>Export Data</button>
            <button className='data-btn delete-btn'>Delete Account</button>
          </div>
        </div>

        <div className='notif-box'>
          <div className='box-header'>
            <Bell className='profile-icon'/>
            <h4>Notifications</h4>
          </div>

          <p className='description'>Set your notification preferences.</p>

          <div className='notif-row'>
            <div className='notif-text'>
              <span className='notif-title'>Deadline Reminders</span>
              <span className='notif-subtitle'>Receive reminders for upcoming deadlines.</span>
            </div>
            <input type="checkbox" />
          </div>

          <div className='notif-row'>
            <div className='notif-text'>
              <span className='notif-title'>Daily Digest</span>
              <span className='notif-subtitle'>Summary of Today's tasks.</span>
            </div>
            <input type="checkbox" />
          </div>

          <div className='notif-row'>
            <div className='notif-text'>
              <span className='notif-title'>OverDue Alerts</span>
              <span className='notif-subtitle'>Urgent notifications for overdue tasks.</span>
            </div>
            <input type="checkbox" />
          </div>

          <button className='save-btn'>Save Selections</button>

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;