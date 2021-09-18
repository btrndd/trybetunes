import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import AlbumCard from './AlbumCard';

class AlbumsList extends React.Component {
  constructor() {
    super();
    this.list = this.list.bind(this);
  }

  list() {
    const { albums, returnApi } = this.props;
    return (
      <section>
        {/* <h2>
          Resultado de álbuns de:
          {' '}
          { albums[0].artistName }
        </h2> */}
        {albums.length > 0 && returnApi ? (
          albums.map((album) => (
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to="/album/:id"
              key={ album.artistId }
            >
              <AlbumCard
                imagePath={ album.artworkUrl100 }
                collectionName={ album.collectionName }
                artistName={ album.artistName }
              />
            </Link>))
        )
          : <h4>Nenhum álbum foi encontrado</h4>}
      </section>);
  }

  render() {
    const { loadingAlbums } = this.props;
    return (
      <div>
        { loadingAlbums
          ? this.list()
          : <Loading /> }
      </div>
    );
  }
}

AlbumsList.propTypes = {
  loadingAlbums: PropTypes.bool.isRequired,
  returnApi: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  })).isRequired,
};

export default AlbumsList;
