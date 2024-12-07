import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import PasswordItem from '../PasswordItem';

class PasswordManager extends Component {
  state = {
    passwordRecords: [],
    inputUrl: '',
    inputName: '',
    masterPassword: '',
    searchInput: '',
    passwordLength: 12, // Default password length
  };

  deletePasswordRecord = (id) => {
    const { passwordRecords } = this.state;
    const filteredPasswordRecords = passwordRecords.filter((e) => e.id !== id);
    this.setState({ passwordRecords: filteredPasswordRecords });
  };

  getSearchRecords = () => {
    const { passwordRecords, searchInput } = this.state;
    return passwordRecords.filter((eachRecord) =>
      eachRecord.url.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  onInputUrlChange = (e) => {
    this.setState({ inputUrl: e.target.value });
  };

  onSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onInputNameChange = (e) => {
    this.setState({ inputName: e.target.value });
  };

  onMasterPasswordChange = (e) => {
    this.setState({ masterPassword: e.target.value });
  };

  onPasswordLengthChange = (e) => {
    this.setState({ passwordLength: Number(e.target.value) });
  };

  generatePassword = async (url, name, masterPassword, length) => {
    const data = `${url}:${name}:${masterPassword}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = new Uint8Array(hashBuffer);

    let password = '';
    for (let i = 0; i < length; i++) {
      const byte = hashArray[i % hashArray.length];
      const charCode = (byte % 94) + 33; // Printable ASCII range
      password += String.fromCharCode(charCode);
    }

    return password;
  };

  addPasswordRecord = async (e) => {
    e.preventDefault();
    const { inputUrl, inputName, masterPassword, passwordLength } = this.state;

    const newPassword = await this.generatePassword(inputUrl, inputName, masterPassword, passwordLength);

    const newPasswordRecord = {
      id: uuidv4(),
      url: inputUrl,
      name: inputName,
      password: newPassword, // Set the generated password
    };

    this.setState((prevState) => ({
      passwordRecords: [...prevState.passwordRecords, newPasswordRecord],
      inputUrl: '',
      inputName: '',
      masterPassword: '',
    }));
  };

  copyToClipboard = (password) => {
    if (password) {
        navigator.clipboard.writeText(password);
        copyButton.title = 'Password copied to clipboard!'; // Set hover message
        setTimeout(() => {
            copyButton.title = ''; // Clear the hover message after a short delay
        }, 2000); // Adjust the delay as needed
    } else {
        messageElement.textContent = 'No password generated yet to copy.';
    }
};

  render() {
    const { passwordLength, masterPassword } = this.state;
    const searchResults = this.getSearchRecords();

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
          </div>
          <div className="card-container manager-container">
            <div className="card form-container">
              <form className="card-responsive" onSubmit={this.addPasswordRecord}>
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-container">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    value={this.state.inputUrl}
                    onChange={this.onInputUrlChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    value={this.state.inputName}
                    onChange={this.onInputNameChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Master Password"
                    value={masterPassword}
                    onChange={this.onMasterPasswordChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="passwordLength" className="length-label">
                    Password Length: {passwordLength}
                  </label>
                  <input
                    id="passwordLength"
                    type="range"
                    min="8"
                    max="32"
                    value={passwordLength}
                    onChange={this.onPasswordLengthChange}
                    className="length-slider"
                  />
                </div>
                <div className="btn-container">
                  <button
                    className="add-btn"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card-container">
            <div className="card-responsive no-password-container">
              <div className="passwords-header">
                <h1 className="passwords-header-title">
                  Your Passwords
                  <p className="results-count"> {searchResults.length}</p>
                </h1>
                <div className="search-container">
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                    onChange={this.onSearchChange}
                  />
                </div>
              </div>
              <hr className="hr-line" />
              {searchResults.length !== 0 ? (
                <ul className="passwords-list-container">
                  {searchResults.map((eachRecord) => (
                    <PasswordItem
                      key={eachRecord.id}
                      record={eachRecord}
                      deletePasswordRecord={this.deletePasswordRecord}
                      password={eachRecord.password} // Pass the generated password
                      copyToClipboard={() => this.copyToClipboard(eachRecord.password)} // Pass the copy function
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-passwords-title">No Passwords</p>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
}

export default PasswordManager;
