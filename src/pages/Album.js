import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.listMusics = this.listMusics.bind(this);
    this.requestAddSong = this.requestAddSong.bind(this);
    this.requestFavSongs = this.requestFavSongs.bind(this);
    this.state = {
      musics: [],
      artist: '',
      album: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.listMusics();
  }

  componentDidUpdate() {
    this.requestFavSongs();
  }

  async requestFavSongs() {
    const favSongs = await getFavoriteSongs();
    const checkSongs = favSongs.forEach((song) => {
      document.getElementById(song.trackId).setAttribute('checked', true);
    });
    return checkSongs;
  }

  async requestAddSong({ target }) {
    const songId = +target.id;
    const value = target.checked;
    const { musics } = this.state;
    this.setState({
      favorite: value,
    });
    if (target.checked === true) {
      this.setState({
        loading: false,
      });
      const music = musics.find((element) => element.trackId === songId);
      console.log(music);
      await addSong(music);
      this.setState({
        loading: true,
        [music.trackId]: [music],
      });
    }
  }

  async listMusics() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      musics: [...musicList],
      artist: musicList[0].artistName,
      album: musicList[0].collectionName,
    });
  }

  render() {
    const { musics, album, artist, loading, favorite } = this.state;
    return (
      <>
        { loading ? (
          <>
            <Header />
            <div data-testid="page-album">
              <h4 data-testid="album-name">{album}</h4>
              <p data-testid="artist-name">{artist}</p>
              {musics.slice(1).map((music) => (<MusicCard
                key={ music.trackId }
                info={ music }
                favorite={ favorite }
                requestAddSong={ this.requestAddSong }
              />))}
            </div>
          </>)
          : <Loading /> }
        <div />
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
