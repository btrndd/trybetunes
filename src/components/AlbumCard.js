import React from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { imagePath, collectionName, artistName } = this.props;
    return (
      <section>
        <img alt="Imagem do album" src={ imagePath } />
        <h4>{ collectionName }</h4>
        <p>{ artistName }</p>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  imagePath: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumCard;
