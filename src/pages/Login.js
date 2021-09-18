import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import LoginCard from '../components/LoginCard';

class Login extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: '',
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.enableButton();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    this.enableButton();
  }

  createUserCall = async () => {
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState({
      redirect: true,
    });
  }

  enableButton() {
    const { user } = this.state;
    const maxNum = 2;
    if (user.length >= maxNum) {
      document.querySelector('.login-btn').disabled = false;
    } else {
      document.querySelector('.login-btn').disabled = true;
    }
  }

  render() {
    const { user, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : <LoginCard
          user={ user }
          createUserCall={ this.createUserCall }
          handleChange={ this.handleChange }
        />}
        {redirect ? <Redirect to="/search" /> : <Redirect to="/" />}
      </div>
    );
  }
}

export default Login;
