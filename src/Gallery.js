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
    let airtime = show_info.airtime;
    let season = show_info.season;
    return (
      <div className="tvshow-data" onClick={(e) => this.thumbnailShowClicked(e, show_info.url)}>
        <div className="poster">
          <img src={src} key={src}/>
          <div className="tvshow-details">
            <div className="season-ep">
            {season}
            {
              ep_number !== "Not Available" &&
              <text>
                x{ep_number}
              </text> 
            }
            </div>
            <div className="episode-name">
              {ep_name}  
            </div>
            <div className='network-name'>
              {network}
            </div>
            <div className='time-date-info'>
                Today, {new Date('1970-01-01T' + airtime + 'Z').toLocaleTimeString({},
                        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}
            </div>
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
    // TODO : The screen breaks up into many blue rectangles but should be one gradient color instead.
    return (<div className="blank-page"><text>No shows found :(</text></div>);
    }
}

export default Gallery;