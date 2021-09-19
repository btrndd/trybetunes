import React from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.listMusics = this.listMusics.bind(this);
    this.state = {
      musics: [],
      artist: '',
      album: '',
    };
  }

  componentDidMount() {
    this.listMusics();
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
    const { musics, album, artist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h4 data-testid="album-name">{album}</h4>
          <p data-testid="artist-name">{artist}</p>
          { musics.slice(1).map((music) => (<MusicCard
            key={ music.trackId }
            info={ music }
          />)) }
        </div>
      </>
    );
  }
}

export default Album;
