import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { imagePath, collectionName, artistName, collectionId } = this.props;
    return (
      <section>
        <img alt={ `Imagem do Album ${collectionName}` } src={ imagePath } />
        <h4>{ collectionName }</h4>
        <p>{ artistName }</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Mais informações
        </Link>
        ;
      </section>
    );
  }
}

AlbumCard.propTypes = {
  imagePath: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumCard;
