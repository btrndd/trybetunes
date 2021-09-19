import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import AlbumCard from './AlbumCard';

class AlbumsList extends React.Component {
  constructor() {
    super();
    this.list = this.list.bind(this);
  }

  list() {
    const { albums, artist } = this.props;
    return (
      <section>
        { albums.length > 0 ? (
          <>
            <h2>{ `Resultado de álbuns de: ${artist}` }</h2>
            <div>
              {albums.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  collectionId={ album.collectionId }
                  imagePath={ album.artworkUrl100 }
                  collectionName={ album.collectionName }
                  artistName={ album.artistName }
                />))}
            </div>
          </>
        )
          : <h4>Nenhum álbum foi encontrado</h4>}
      </section>);
  }

  render() {
    const { returnApi } = this.props;
    return (
      <div>
        { returnApi
          ? this.list()
          : <Loading /> }
      </div>
    );
  }
}

AlbumsList.propTypes = {
  returnApi: PropTypes.bool.isRequired,
  artist: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string.isRequired,
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default AlbumsList;
