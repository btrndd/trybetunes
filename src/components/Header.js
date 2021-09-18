import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.getUserName = this.getUserName.bind(this);
    this.headerElement = this.headerElement.bind(this);
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

  headerElement() {
    const { user } = this.state;
    return (
      <>
        <h4 data-testid="header-user-name">{user}</h4>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? this.headerElement()
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
