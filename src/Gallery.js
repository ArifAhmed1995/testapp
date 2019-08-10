import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null};
    this.renderImageContent = this.renderImageContent.bind(this);
    this.thumbnailShowClicked = this.thumbnailShowClicked.bind(this);
  }

  renderImageContent(show_info, index) {
    let src = show_info.show.image.medium;
    let ep_name = show_info.name;
    let ep_number = (show_info.number === null) ? "Not Available" : show_info.number;

    let network = (show_info.show.network === null) ? show_info.show.webChannel.name : show_info.show.network.name;

    let airdate = show_info.airdate;
    let airtime = show_info.airtime;

    return (
      <div className="tvshow-data" onClick={(e) => this.thumbnailShowClicked(e, show_info.url)}>
        <div className="poster">
          <img src={src} key={src}/>
          <div className="tvshow-details">
            <div class="episode-name">
              {ep_name}  
            </div>
            Episode Number : {ep_number}Airing on : {network}<br></br>{ep_name}
            Date : {airdate}Time : {airtime}
          </div>
        </div>
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
                <div className="gallery-grid">
                  {this.props.shows.map(this.renderImageContent)}
                </div>
              )
    }
    return null;
    }
}

export default Gallery;