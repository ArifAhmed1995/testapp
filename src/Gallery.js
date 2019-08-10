import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null};
    this.renderImageContent = this.renderImageContent.bind(this);
    this.thumbnailShowClicked = this.thumbnailShowClicked.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.shows !== prevProps.shows)
      return null;
  }

  renderImageContent(show_info, index) {
    let show_name = show_info.show.name;
    let src = show_info.show.image.medium;
    let ep_name = show_info.name;
    let ep_number = show_info.number;

    let network = (show_info.show.network === null) ? show_info.show.webChannel.name : show_info.show.network.name;

    let airdate = show_info.airdate;
    let airtime = show_info.airtime;
    return (
      <div className="text-data-show">
        <img src={src} key={src} onClick={(e) => this.thumbnailShowClicked(e, show_info.url)}/>
        <br></br>{show_name}<br></br>{ep_name}
        <br></br>Episode Number : {ep_number}
        <br></br>Airing on : {network}<br></br>{ep_name}
        <br></br>Date : {airdate}<br></br>Time : {airtime}
      </div>
    ) 
  }

  thumbnailShowClicked(e, url) {
    window.open(url, '_blank').focus();
  }

  render() {
    if(this.props.shows.length !== 0)
    {
        return (
            <div className="gallery-container">
                <div className="gallery-grid">
                {this.props.shows.map(this.renderImageContent)}
                </div>
            </div>
        )
    }
    return null;
    }
}

export default Gallery;