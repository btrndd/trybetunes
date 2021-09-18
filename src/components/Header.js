import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.getUserName = this.getUserName.bind(this);
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();
    this.setState({
      user: user.name,
      loading: true,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <h4 data-testid="header-user-name">{user}</h4>
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
