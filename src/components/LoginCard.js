import React from 'react';
import PropTypes from 'prop-types';
import BtnEnabled from './BtnEnabled';

class LoginCard extends React.Component {
  render() {
    const { user, handleChange, createUserCall } = this.props;
    return (
      <form>
        <input
          data-testid="login-name-input"
          name="user"
          placeholder="Nome"
          value={ user }
          onChange={ handleChange }
        />
        <BtnEnabled createUserCall={ createUserCall } />
      </form>
    );
  }
}

LoginCard.propTypes = {
  handleChange: PropTypes.func.isRequired,
  createUserCall: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default LoginCard;
