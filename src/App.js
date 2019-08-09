import React from 'react';
import './App.css';
import Gallery from './Gallery'
import './Gallery.css';

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = { searchQueryGallery: "Test" };
  }
  showCheck = () => {
    let searchQuery = document.getElementById("showSearch");
    this.setState({
      searchQueryGallery: searchQuery
    });
  }

  render() {
    if(this.state.searchQueryGallery === null)
      this.state.searchQueryGallery = ""
    return (
      <div>
        <strong>Search : </strong><input type="text"
                                        name="showSearch"
                                        id="showSearch"
                                        onKeyUp={this.showCheck}></input>
              <br></br>
          <Gallery searchQueryGallery={this.state.searchQueryGallery.value}
          />
      </div>
    );
  }
}

export default App;
