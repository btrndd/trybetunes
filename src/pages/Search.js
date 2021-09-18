import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchText: '',
      // loading: false,
      // redirect: false,
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

  enableButton() {
    const { searchText } = this.state;
    const maxNum = 1;
    if (searchText.length >= maxNum) {
      document.querySelector('.search-btn').disabled = false;
    } else {
      document.querySelector('.search-btn').disabled = true;
    }
  }

  render() {
    const { searchText } = this.state;
    return (
      <section data-testid="page-search">
        <form>
          <input
            name="searchText"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            value={ searchText }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            className="search-btn"
          >
            Procurar
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
