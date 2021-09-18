import React from 'react';
import PropTypes from 'prop-types';

class BtnEnabled extends React.Component {
  render() {
    const { createUserCall } = this.props;
    return (
      <button
        type="button"
        data-testid="login-submit-button"
        className="login-btn"
        onClick={ createUserCall }
      >
        Entrar
      </button>
    );
  }
}

BtnEnabled.propTypes = {
  createUserCall: PropTypes.func.isRequired,
};

export default BtnEnabled;
