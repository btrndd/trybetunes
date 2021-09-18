import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumsList from '../components/AlbumsList';

class Search extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formSearch = this.formSearch.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.state = {
      searchText: '',
      loading: true,
      returnApi: false,
      albums: '',
      loadingAlbums: true,
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

  async searchArtist() {
    const { searchText } = this.state;
    this.setState({
      searchText: '',
      returnApi: false,
      albums: '',
      loadingAlbums: false,
    });
    const queryResult = await searchAlbumsAPI(searchText);
    this.setState({
      returnApi: true,
      albums: queryResult,
      loadingAlbums: true,
    });
  }

  formSearch() {
    const { searchText } = this.state;
    return (
      <form>
        <input
          name="searchText"
          className="search"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          value={ searchText }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          className="search-btn"
          onClick={ this.searchArtist }
        >
          Procurar
        </button>
      </form>
    );
  }

  render() {
    const { loading, returnApi, albums, loadingAlbums } = this.state;
    return (
      <section data-testid="page-search">
        {loading ? this.formSearch()
          : <Loading />}
        {(loadingAlbums ? (
          <AlbumsList
            returnApi={ returnApi }
            albums={ albums }
            loadingAlbums={ loadingAlbums }
          />)
          : null) }
      </section>
    );
  }
}

export default Search;
