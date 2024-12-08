import React, { useState } from 'react';
import './index.css';

const PasswordItem = (props) => {
  const profileColors = [
    '#7683cb',
    '#f59e0b',
    '#10b981',
    '#f97316',
    '#14b8a6',
    '#b91c1c',
    '#0ea5e9',
  ];
  const profilePicColor = profileColors[Math.floor(Math.random() * profileColors.length)];
  const { record, deletePasswordRecord, password } = props;
  const { id, url, name } = record;

  const [isFlashing, setIsFlashing] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const deleteItem = () => {
    deletePasswordRecord(id);
  };

  const copyToClipboard = (password) => {
    if (password) {
      navigator.clipboard.writeText(password);
      setIsFlashing(true);
      setShowCopiedMessage(true);
      setTimeout(() => {
        setIsFlashing(false);
        setShowCopiedMessage(false);
      }, 2000);
    }
  };

  return (
    <li className="password-item">
      <div className="circle" style={{ background: profilePicColor }}>
        {name.charAt(0)}
      </div>
      <div className="details-container">
        <h2 className="website-text">{url}</h2>
        <div className="name-container">
          <span className="name-label">Username: {name} </span>
        </div>
        <div className="password-info-container">
          <p className="password-label">Password:</p>
          <div className={`password-container ${isFlashing ? 'flashing' : ''}`}>
            <p className="password-text">{password || 'Not generated yet'}</p>
            <button
              type="button"
              onClick={() => copyToClipboard(password)}
              className="copy-btn"
            >
              Copy
            </button>
            {showCopiedMessage && <span className="copied-message">Copied!</span>}
          </div>
        </div>
      </div>
      <div className="action-buttons">
          <button
          type="button"
          onClick={deleteItem}
          className="delete-btn"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  );
};

export default PasswordItem;
