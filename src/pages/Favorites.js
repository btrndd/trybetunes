import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.getFavorites = this.getFavorites.bind(this);
    this.mapSongs = this.mapSongs.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
    this.state = {
      loading: false,
      songs: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  // componentDidUpdate() {
  //   this.getFavorites();
  // }

  setLoadingState() {
    this.setState({
      loading: false,
    });
  }

  async getFavorites() {
    const favSongsList = await getFavoriteSongs();
    this.setState({
      songs: favSongsList,
      loading: true,
    });
  }

  mapSongs(songs) {
    const { loading } = this.state;
    return songs.map((song) => (
      <MusicCard
        key={ song.trackId }
        info={ song }
        loading={ loading }
        setLoading={ this.setLoadingState }
        getFavorites={ this.getFavorites }
      />));
  }

  render() {
    const { loading, songs } = this.state;
    return (
      <main data-testid="page-favorites">
        { loading ? this.mapSongs(songs) : <Loading /> }
      </main>
    );
  }
}

export default Favorites;
