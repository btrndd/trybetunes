import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
// import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.listMusics = this.listMusics.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
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

  // async requestAddSong({ target }) {
  //   const songId = +target.id;
  //   const value = target.checked;
  //   const { musics } = this.state;
  //   this.setState({
  //     favorite: value,
  //   });
  //   if (target.checked) {
  //     this.setState({
  //       loading: false,
  //     });
  //     const music = musics.find((element) => element.trackId === songId);
  //     await addSong(music);
  //     this.setState({
  //       loading: true,
  //     });
  //   }
  // }

  setLoadingState(loading) {
    this.setState({
      loading,
    });
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
    const { musics, album, artist, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h4 data-testid="album-name">{album}</h4>
          <p data-testid="artist-name">{artist}</p>
          {musics.slice(1).map((music) => (<MusicCard
            key={ music.trackId }
            info={ music }
            musics={ musics }
            loadingStateCallback={ this.setLoadingState }
            loading={ loading }
          />))}
        </div>
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
