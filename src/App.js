import React from 'react';
import './App.css';
import Gallery from './Gallery'
import './Gallery.css';
import { stringLiteral } from '@babel/types';

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
                  shows: [],
                  filtered_shows: [],
                };
    this.filterShows = this.filterShows.bind(this);
    this.sortShows = this.sortShows.bind(this);
    this.searchQuery = "";

    let apiRequest = new XMLHttpRequest();

    apiRequest.open('GET', 'https://api.tvmaze.com/schedule');
    apiRequest.send();

    apiRequest.onreadystatechange = () => {  
        if(apiRequest.readyState === 4 && apiRequest.status === 200) {
          this.setState({
              shows: JSON.parse(apiRequest.responseText)
            });
            this.shows_real = JSON.parse(apiRequest.responseText);
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

  filterShows() {
        this.searchQuery = document.getElementById("showSearch").value;
        this.setState({filtered_shows : this.state.shows.filter(element => (
            element.show.name.toLowerCase().search(this.searchQuery.toLowerCase()) !== -1
            || element.name.toLowerCase().search(this.searchQuery.toLowerCase()) !== -1
            || ((element.show.network === null) ? element.show.webChannel.name : element.show.network.name).toLowerCase().search(this.searchQuery.toLowerCase()) !== -1
            || ((element.number === null) ? "Not Available" : element.number.toString(10)).toLowerCase().search(this.searchQuery.toLowerCase()) !== -1
            || element.airdate.toLowerCase().search(this.searchQuery.toLowerCase()) !== -1
            || element.airtime.toLowerCase().search(this.searchQuery.toLowerCase()) !== -1
          ))});
  }

  sortShows() {
    let fs = this.state.filtered_shows;
    if(fs.length === 0 && this.searchQuery==="")
      fs = this.state.shows;
    fs.sort(function(a, b) {return b.show.rating.average - a.show.rating.average;})
    return fs;
  }

  render() {
    return (
      <div>
        <div align="middle">
          <br></br>
           <strong className="search-text">Search : </strong><input
                className="input-textbox"
                type="text"
                name="showSearch"
                id="showSearch"
                onKeyUp={this.filterShows}></input>
            <br></br>
            <br></br>
        </div>
          <Gallery shows={this.sortShows()} />
      </div>
    );
  }
}

export default App;
