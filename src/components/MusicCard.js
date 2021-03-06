import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.requestFavSongs = this.requestFavSongs.bind(this);
    this.requestAddSong = this.requestAddSong.bind(this);
    this.state = {
      favorite: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.requestFavSongs();
  }

  async requestFavSongs() {
    const { props:
      { info:
      { trackId } } } = this;
    const favSongs = await getFavoriteSongs();
    const check = favSongs.some((element) => (+element.trackId) === (+trackId));
    if (check) {
      this.setState({ favorite: true });
    }
  }

  async requestAddSong({ target }) {
    const { info, setLoading, getFavorites } = this.props;
    const value = target.checked;
    this.setState({
      favorite: value,
    });
    if (target.checked) {
      this.setState({
        loading: false,
      });
      await addSong(info);
      this.setState({
        loading: true,
      });
    } else if (!target.checked && setLoading && getFavorites) {
      this.setState({
        loading: false,
      });
      setLoading();
      await removeSong(info);
      this.setState({
        loading: true,
      });
      getFavorites();
    } else if (!target.checked) {
      this.setState({
        loading: false,
      });
      await removeSong(info);
      this.setState({
        loading: true,
      });
    }
  }

  render() {
    const { props:
      { info:
      { previewUrl, trackName, trackId } } } = this;
    const { favorite, loading } = this.state;
    return (
      <>
        { loading ? (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor={ `${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                name="favorite"
                id={ `${trackId}` }
                type="checkbox"
                onChange={ this.requestAddSong }
                checked={ favorite }
              />
            </label>
          </>)
          : <Loading /> }
        <div />
      </>
    );
  }
}

MusicCard.defaultProps = {
  setLoading: false,
  getFavorites: true,
};

MusicCard.propTypes = {
  info: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  getFavorites: PropTypes.func,
  setLoading: PropTypes.func,
};

export default MusicCard;
