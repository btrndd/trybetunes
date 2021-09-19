import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { props:
      { info:
      { previewUrl, trackName } } } = this;

    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </>
    );
  }
}

export default MusicCard;
