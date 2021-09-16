import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: '',
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    this.enableButton();
  }

  enableButton() {
    const { user } = this.state;
    const maxNum = 3;
    if (user.length >= maxNum) {
      document.querySelector('.login-btn').removeAttribute('disabled');
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            name="user"
            placeholder="Nome"
            value={ user }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            className="login-btn"
            onClick={ createUser({ name: user }) }
            disabled
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
