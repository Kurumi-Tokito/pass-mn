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
  const { record, deletePasswordRecord, password, copyToClipboard } = props;
  const { id, url, name } = record;

  const deleteItem = () => {
    deletePasswordRecord(id);
  };

  return (
    <li className="password-item">
      <div className="circle" style={{ background: profilePicColor }}>
        {name.charAt(0)}
      </div>
      <div className="details-container">
        <p className="website-text">{url}</p>
        <p className="website-text">{name}</p>
        <p className="website-text">Password: {password || 'Not generated yet'}</p>
      </div>
      <div className="generate-password-container">
        <button
          type="button"
          onClick={deleteItem}
          className="delete-btn"
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="copy-btn"
        >
          Copy
        </button>
      </div>
    </li>
  );
};

export default PasswordItem;
