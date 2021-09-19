import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { props:
      { info:
      { previewUrl, trackName, trackId } } } = this;
    const { requestAddSong, favorite } = this.props;

    return (
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
            onChange={ requestAddSong }
            value={ favorite }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  info: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  requestAddSong: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
