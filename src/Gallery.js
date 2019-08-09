import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null , shows: []};
    this.imgUrls = [];
    this.renderImageContent = this.renderImageContent.bind(this);
  }

  componentDidMount() {
    let apiRequest = new XMLHttpRequest();

    apiRequest.open('GET', 'https://api.tvmaze.com/schedule');
    apiRequest.send();

    apiRequest.onreadystatechange = () => {
        if(apiRequest.readyState === 4 && apiRequest.status === 200)
        {
            let response = JSON.parse(apiRequest.responseText);
            this.setState({
              shows: response
            });
           let current_rating = 0;
            for(let index = 0;index < this.state.shows.length;index++)
            {
              current_rating = this.state.shows[index].show.rating.average
              if(current_rating === null)
                this.state.shows[index].show.rating.average = 0;
            }
        }
    };
  }

  renderImageContent(show_info, index) {
    let show_name = show_info.show.name;
    let src = show_info.show.image.medium;
    let ep_name = show_info.name;
    let ep_number = show_info.number;
    let network = show_info.show.network.name;
    let airdate = show_info.airdate;
    let airtime = show_info.airtime;
    return (
      <div onClick={(e) => this.openModal(e, index)}>
        <img src={src} key={src}/>
        <br></br>{show_name}<br></br>{ep_name}
        <br></br>Episode Number : {ep_number}
        <br></br>Airing on : {network}<br></br>{ep_name}
        <br></br>Date : {airdate}<br></br>Time : {airtime}
      </div>
    ) 
  }
  openModal(e, index) {
    this.setState ({ currentIndex: index });
    window.open(this.state.shows[index].url, '_blank').focus();
  }
  closeModal(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState ({ currentIndex: null });
  }
  
  render() {
    let sq = this.props.searchQueryGallery;
    if(sq == null)
        sq = "";
    let filtered_shows = [];
    let total_shows = this.state.shows;
    for(let index = 0;index < this.state.shows.length;index++)
    {
        if(
            (total_shows[index].show.name.toLowerCase().search(sq.toLowerCase())
                || total_shows[index].name.toLowerCase().search(sq.toLowerCase())
                || total_shows[index].show.network.name.toLowerCase().search(sq.toLowerCase())
                || total_shows[index].number.toString(10).toLowerCase().search(sq.toLowerCase())
                || total_shows[index].airdate.toLowerCase().search(sq.toLowerCase())
                || total_shows[index].airtime.toLowerCase().search(sq.toLowerCase())
            ) !== -1
        )
            filtered_shows.push(total_shows[index]);
    }
    if(filtered_shows.length !== 0)
    {
        filtered_shows.sort(function(a, b){return b.show.rating.average - a.show.rating.average;});
        return (
            <div className="gallery-container">
                <div className="gallery-grid">
                {filtered_shows.map(this.renderImageContent)}
                </div>
            </div>
        )
    }
    return null;
    }
}

export default Gallery;